use starknet::{ContractAddress};

// define the interface
#[dojo::interface]
trait IActions {
    fn initialize_puzzle(blobert_contract: ContractAddress);
    fn add_piece(position: u16, piece: u16);
    fn remove_piece(position: u16);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use super::{IActions};

    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin::token::erc721::interface::{
        IERC721, IERC721Dispatcher, IERC721DispatcherTrait, IERC721LibraryDispatcher
    };
    use blobert_puzzle_v::models::puzzle::{Placement, Blobert, Piece};

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn initialize_puzzle(world: IWorldDispatcher, blobert_contract: ContractAddress) {
            let blobert = get!(world, 1, (Blobert));

            assert(blobert.initialized == 0, 'Already initialized');

            set!(world, (Blobert { id: 1, initialized: 1, contract: blobert_contract })); 
            
            // Place remaining pieces
            set!(world, (
                Placement { position: 285, piece: 4900 },
                Placement { position: 295, piece: 4899 },
                Placement { position: 305, piece: 4898 },
                Placement { position: 315, piece: 4897 },
                Placement { position: 325, piece: 4896 },
                Placement { position: 335, piece: 4895 },
                Placement { position: 345, piece: 4894 },
                
                Placement { position: 985, piece: 4893 },
                Placement { position: 995, piece: 4892 },
                Placement { position: 1005, piece: 4891 },
                Placement { position: 1015, piece: 4890 },
                Placement { position: 1025, piece: 4889 },
                Placement { position: 1035, piece: 4888 },
                Placement { position: 1045, piece: 4887 },

                Placement { position: 1685, piece: 4886 },
                Placement { position: 1695, piece: 4885 },
                Placement { position: 1705, piece: 4884 },
                Placement { position: 1715, piece: 4883 },
                Placement { position: 1725, piece: 4882 },
                Placement { position: 1735, piece: 4881 },
                Placement { position: 1745, piece: 4880 },

                Placement { position: 2385, piece: 4879 },
                Placement { position: 2395, piece: 4878 },
                Placement { position: 2405, piece: 4877 },
                Placement { position: 2415, piece: 4876 },
                Placement { position: 2425, piece: 4875 },
                Placement { position: 2435, piece: 4874 },
                Placement { position: 2445, piece: 4873 },

                Placement { position: 3085, piece: 4872 },
                Placement { position: 3095, piece: 4871 },
                Placement { position: 3105, piece: 4870 },
                Placement { position: 3115, piece: 4869 },
                Placement { position: 3125, piece: 4868 },
                Placement { position: 3135, piece: 4867 },
                Placement { position: 3145, piece: 4866 },

                Placement { position: 3785, piece: 4865 },
                Placement { position: 3795, piece: 4864 },
                Placement { position: 3805, piece: 4863 },
                Placement { position: 3815, piece: 4862 },
                Placement { position: 3825, piece: 4861 },
                Placement { position: 3835, piece: 4860 },
                Placement { position: 3845, piece: 4859 },

                Placement { position: 4485, piece: 4858 },
                Placement { position: 4495, piece: 4857 },
                Placement { position: 4505, piece: 4856 },
                Placement { position: 4515, piece: 4855 },
                Placement { position: 4525, piece: 4854 },
                Placement { position: 4535, piece: 4853 },
                Placement { position: 4545, piece: 4852 },

                Placement { position: 3130, piece: 4851 },
                Placement { position: 3138, piece: 4850 },
                Placement { position: 984, piece: 4849 },
                Placement { position: 983, piece: 4848 },

                Placement { position: 1003, piece: 4847 },
                Placement { position: 1004, piece: 4846 },
                Placement { position: 1006, piece: 4845 },
            ));
        }

        fn add_piece(world: IWorldDispatcher, position: u16, piece: u16) {
            let player = get_caller_address();

            let placement = get!(world, position, (Placement));
            let current_piece = get!(world, piece, (Piece));

            assert(placement.piece == 0, 'Position occupied');
            assert(current_piece.placed == 0, 'Piece already used');
            assert(position < 4900, 'Out of bounds');

            let entity = get!(world, 1, (Blobert));
            let blobert = IERC721Dispatcher { contract_address: entity.contract };

            assert(player == blobert.owner_of(piece.into()), 'Not owner');

            set!(world, (
                Placement { position, piece },
                Piece { piece, placed: 1 }
            ));
        }

        fn remove_piece(world: IWorldDispatcher, position: u16) {
            let player = get_caller_address();
            let entity = get!(world, 1, (Blobert));
            let blobert = IERC721Dispatcher { contract_address: entity.contract };

            let placement = get!(world, position, (Placement));
            let current_piece = get!(world, placement.piece, (Piece));

            assert(player == blobert.owner_of(placement.piece.into()), 'Not owner');
            assert(current_piece.placed == 1, 'Doesnt exist');

            delete!(world, (placement, current_piece));
        }
    }
}
