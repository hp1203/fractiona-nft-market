import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { FractionalNFTCreated } from "../generated/schema"
import { FractionalNFTCreated as FractionalNFTCreatedEvent } from "../generated/FractionalNFTFactory/FractionalNFTFactory"
import { handleFractionalNFTCreated } from "../src/fractional-nft-factory"
import { createFractionalNFTCreatedEvent } from "./fractional-nft-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let fractionalNFT = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newFractionalNFTCreatedEvent = createFractionalNFTCreatedEvent(
      owner,
      fractionalNFT
    )
    handleFractionalNFTCreated(newFractionalNFTCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FractionalNFTCreated created and stored", () => {
    assert.entityCount("FractionalNFTCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FractionalNFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FractionalNFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionalNFT",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
