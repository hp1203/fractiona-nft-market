import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ContractCreationFailed } from "../generated/schema"
import { ContractCreationFailed as ContractCreationFailedEvent } from "../generated/FractionalNFTFactory/FractionalNFTFactory"
import { handleContractCreationFailed } from "../src/fractional-nft-factory"
import { createContractCreationFailedEvent } from "./fractional-nft-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let reason = "Example string value"
    let newContractCreationFailedEvent = createContractCreationFailedEvent(
      owner,
      reason
    )
    handleContractCreationFailed(newContractCreationFailedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContractCreationFailed created and stored", () => {
    assert.entityCount("ContractCreationFailed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContractCreationFailed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContractCreationFailed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reason",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
