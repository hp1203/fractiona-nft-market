import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContractCreationFailed,
  FractionalNFTCreated
} from "../generated/FractionalNFTFactory/FractionalNFTFactory"

export function createContractCreationFailedEvent(
  owner: Address,
  reason: string
): ContractCreationFailed {
  let contractCreationFailedEvent = changetype<ContractCreationFailed>(
    newMockEvent()
  )

  contractCreationFailedEvent.parameters = new Array()

  contractCreationFailedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  contractCreationFailedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return contractCreationFailedEvent
}

export function createFractionalNFTCreatedEvent(
  owner: Address,
  fractionalNFT: Address
): FractionalNFTCreated {
  let fractionalNftCreatedEvent = changetype<FractionalNFTCreated>(
    newMockEvent()
  )

  fractionalNftCreatedEvent.parameters = new Array()

  fractionalNftCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  fractionalNftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fractionalNFT",
      ethereum.Value.fromAddress(fractionalNFT)
    )
  )

  return fractionalNftCreatedEvent
}
