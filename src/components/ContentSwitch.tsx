import { FC, useState } from "react"

import styled from "@emotion/styled/macro"
import { Transition } from "@headlessui/react"
import { ChevronsLeft, ChevronsRight } from "react-feather"

import { IconButton } from "./IconButton"

const SwitchTransition = styled(Transition)`
  position: absolute;
  width: calc(100% - 6rem);
  max-width: 1000px;

  &.transition {
    transition: transform 0.5s ease-in-out;
  }
  &.display {
    transform: translateX(0);
  }
  &.hideLeft {
    transform: translateX(-100vw);
  }
  &.hideRight {
    transform: translateX(100vw);
  }
`

const ButtonPosition = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  > button:hover,
  > button:focus-visible {
    > svg {
      transform: scale(1.3);
    }
  }
`

type SurfaceSwitchProps = {
  leftContent: FC
  rightContent: FC
}

export const ContentSwitch = ({
  leftContent,
  rightContent,
}: SurfaceSwitchProps) => {
  const [activeView, setActiveView] = useState<"left" | "right">("left")
  const toggleView = () =>
    setActiveView(activeView === "left" ? "right" : "left")

  const sharedProps = {
    leaveFrom: "display",
    enterTo: "display",
    enter: "transition",
    leave: "transition",
    unmount: false,
  }
  return (
    <>
      <ButtonPosition>
        <IconButton
          icon={activeView === "left" ? ChevronsLeft : ChevronsRight}
          onClick={toggleView}
          label="Switch view"
        />
      </ButtonPosition>
      <SwitchTransition
        leaveTo="hideLeft"
        enterFrom="hideLeft"
        show={activeView === "left"}
        {...sharedProps}
      >
        {leftContent}
      </SwitchTransition>
      <SwitchTransition
        leaveTo="hideRight"
        enterFrom="hideRight"
        show={activeView === "right"}
        {...sharedProps}
      >
        {rightContent}
      </SwitchTransition>
    </>
  )
}
