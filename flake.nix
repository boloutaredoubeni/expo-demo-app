{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";

    devenv.url = "github:cachix/devenv/v0.5";

    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = { self, nixpkgs, devenv, pre-commit-hooks, ... }@inputs:
    let
      systems =
        [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];
      forAllSystems = f:
        builtins.listToAttrs (map (name: {
          inherit name;
          value = f name;
        }) systems);
    in {
      devShells = forAllSystems (system:
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
          };
          default = devenv.lib.mkShell {
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
              packages = [ pkgs.git pkgs.act ];
            }];
          };
        });
    };
}
