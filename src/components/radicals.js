import styled from "styled-components"
import { space, fontSize, fontWeight, color } from "styled-system"

export const Heading = styled.h1(
  {
    lineHeight: 1.125,
  },
  space,
  fontSize,
  fontWeight,
  color
)

Heading.defaultProps = {
  fontSize: 4,
  fontWeight: "bold",
  mt: 0,
  mb: 2,
}

export const Text = styled.p(
  {
    lineHeight: 1.625,
  },
  space,
  fontSize,
  fontWeight,
  color
)

Text.defaultProps = {
  fontSize: [2, 3],
}
