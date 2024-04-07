use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Blobert {
    #[key]
    id: u8,
    initialized: u8,
    contract: ContractAddress
}

#[derive(Model, Copy, Drop, Serde)]
struct Placement {
    #[key]
    position: u16,
    piece: u16,
}

#[derive(Model, Copy, Drop, Serde)]
struct Piece {
    #[key]
    piece: u16,
    placed: u8
}
