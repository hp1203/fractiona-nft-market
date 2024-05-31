import {
  ContractCreationFailed as ContractCreationFailedEvent,
  FractionalNFTCreated as FractionalNFTCreatedEvent
} from "../generated/FractionalNFTFactory/FractionalNFTFactory"
import {
  ContractCreationFailed,
  FractionalNFTCreated
} from "../generated/schema"

export function handleContractCreationFailed(
  event: ContractCreationFailedEvent
): void {
  let entity = new ContractCreationFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFractionalNFTCreated(
  event: FractionalNFTCreatedEvent
): void {
  let entity = new FractionalNFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.fractionalNFT = event.params.fractionalNFT

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
