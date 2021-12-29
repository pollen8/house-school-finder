import React from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from '@chakra-ui/react';

export const SearchHouses = () => {
  return (
    <form>
      <VStack spacing={5}>
        <FormControl id="area">
          <FormLabel>Area</FormLabel>
          <Input />
        </FormControl>
        <FormControl id="min-price">
          <FormLabel>Min price</FormLabel>
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="max-price">
          <FormLabel>Max price</FormLabel>
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="house-type">

        </FormControl>
      </VStack>
    </form>
  )
}
