{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";

    # Precisely filter files copied to the nix store
    nix-filter.url = "github:numtide/nix-filter";

    devenv.url = "github:cachix/devenv/v0.5";

    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";

    dream2nix.url = "github:nix-community/dream2nix";

    gitignore.url = "github:hercules-ci/gitignore.nix";
  };

  outputs = { self, nixpkgs, devenv, pre-commit-hooks, dream2nix, gitignore
    , nix-filter, ... }@inputs:
    let
      systems =
        [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];
      forAllSystems = f:
        builtins.listToAttrs (map (name: {
          inherit name;
          value = f name;
        }) systems);
      sources = {
        node = gitignore.lib.gitignoreSource (nix-filter.lib {
          root = ./.;
          include = [
            "projects.toml"
            (nix-filter.lib.matchExt "json")
            (nix-filter.lib.matchExt "js")
            (nix-filter.lib.matchExt "ts")
            (nix-filter.lib.matchExt "tsx")
            (nix-filter.lib.inDirectory "app")
            (nix-filter.lib.inDirectory "assets")
            (nix-filter.lib.inDirectory "features")
          ];
        });
      };
      dream2nixOutputs = dream2nix.lib.makeFlakeOutputs {
        inherit systems;
        config.projectRoot = ./.;
        source = sources.node;
        projects = ./projects.toml;
      };

      customOutput = forAllSystems (system:
        let pkgs = import nixpkgs { inherit system; };
        in {
          checks = {
            pre-commit-check = pre-commit-hooks.lib.${system}.run {
              src = ./.;
              hooks = {
                nixpkgs-fmt.enable = true;
                yamllint.enable = true;
                eslint.enable = true;
                statix.enable = true;
              };
            };

            jest = pkgs.runCommand "jest" { } ''
              ${pkgs.nodejs}/bin/npm install 
              ${pkgs.nodejs}/bin/npm run test
            '';
          };
          devShells = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [{

              pre-commit.hooks = {
                eslint.enable = true;
                statix.enable = true;
                nixfmt.enable = true;
                yamllint.enable = true;
              };
              devcontainer.enable = true;
              difftastic.enable = true;
              languages.typescript.enable = true;
              languages.nix.enable = true;

              # https://devenv.sh/reference/options/
              packages = [ pkgs.git pkgs.act pkgs.nixpkgs-fmt ];
            }];
          };
        });
    in nixpkgs.lib.recursiveUpdate dream2nixOutputs customOutput;
}
