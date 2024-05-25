import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { FractionalNFTCreated } from "../generated/FractionalNFTFactory/FractionalNFTFactory"

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
