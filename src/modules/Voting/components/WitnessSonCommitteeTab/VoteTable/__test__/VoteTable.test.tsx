import { render } from "@testing-library/react";
import React from "react";

import { VoteRow, VoteStatus } from "../../../../types";
import { VoteTable } from "../VoteTable";

describe("VoteTable", () => {
  const mockSonsData: VoteRow[] = [
    {
      id: "1",
      type: "sons",
      key: "1",
      rank: 1,
      name: "Test User 1",
      active: true,
      url: "http://test.com",
      votes: "123",
      missedBlocks: 0,
      status: VoteStatus.APPROVED,
      possibleAction: undefined,
    },
    {
      id: "2",
      type: "sons",
      key: "2",
      rank: 2,
      name: "Test User 2",
      active: false,
      url: "http://test.com",
      votes: "456",
      missedBlocks: 1,
      status: VoteStatus.UNAPPROVED,
      possibleAction: undefined,
    },
  ];

  it("renders a sons table with the correct number of rows and columns", () => {
    const addVote = jest.fn();
    const removeVote = jest.fn();
    const voteToAllSidechains = jest.fn();
    const removeAllSidechainsVotes = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const { container } = render(
      <VoteTable
        votesRows={mockSonsData}
        tab={""}
        loading={false}
        addVote={addVote}
        removeVote={removeVote}
        localApprovedVotesIds={[]}
        voteToAllSidechains={voteToAllSidechains}
        removeAllSidechainsVotes={removeAllSidechainsVotes}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("renders witness list items correctly", () => {
    const mockWitnessData: VoteRow[] = [
      {
        id: "1",
        type: "witnesses",
        key: "1",
        rank: 1,
        name: "Test User 1",
        active: true,
        url: "http://test.com",
        votes: "123",
        missedBlocks: 0,
        status: VoteStatus.APPROVED,
        possibleAction: undefined,
      },
      {
        id: "2",
        type: "witnesses",
        key: "2",
        rank: 2,
        name: "Test User 2",
        active: false,
        url: "http://test.com",
        votes: "456",
        missedBlocks: 1,
        status: VoteStatus.UNAPPROVED,
        possibleAction: undefined,
      },
    ];

    const { container } = render(
      <VoteTable
        votesRows={mockWitnessData}
        tab={"witnesses"}
        loading={false}
        addVote={jest.fn()}
        removeVote={jest.fn()}
        localApprovedVotesIds={[]}
        voteToAllSidechains={jest.fn()}
        removeAllSidechainsVotes={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  // it("calls the addVote function with the correct voteId when the add vote button is clicked", () => {
  //   const addVote = jest.fn();
  //   const removeVote = jest.fn();

  //   const { getByTestId } = render(
  //     <VoteTable
  //       votesRows={mockSonsData}
  //       tab={""}
  //       loading={false}
  //       addVote={addVote}
  //       removeVote={removeVote}
  //       localApprovedVotesIds={[]}
  //       voteToAllSidechains={jest.fn()}
  //       removeAllSidechainsVotes={jest.fn()}
  //     />
  //   );

  //   // Add data-testid attribute to the add vote button in the VoteTable component
  //   const addVoteButton = getByTestId("add-vote-button-1");
  //   fireEvent.click(addVoteButton);

  //   expect(addVote).toHaveBeenCalledWith("1");
  // });
});
