import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://172.81.178.142:3001/api/bounty"; // Base address of the Devcash api server

interface bountyFormat {
  bounty_id: number;
  bounty_title: string;
  bounty_amount: string;
  bounty_xDAI: string;
  bounty_description: string;
  bounty_smart_contract_addresss: string;
  bounty_created_by: string;
  bounty_deadline: string;
  bountiesLeft: string;
  bounty_scope_result: string;
  bounty_category: string;
} 

const fetch_all = async (): Promise<bountyFormat[] | boolean> => {
  const url = BASE_URL + "/all"; // endpoint for fetching all the bounties
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    return await response.json();
  } catch (error) {
    console.error("Error fetching all bounties:", error);
    return false;
  }
};

const fetch_single = async (id: number): Promise<bountyFormat | boolean> => {
  const url = BASE_URL + `/${id}`; //endpoint for fetching one single bounty
  try {
    const response = await fetch(url);
    if (!response.ok) return false;
    return await response.json();
  } catch (error) {
    console.error(`Error fetching bounty with id ${id}:`, error);
    return false;
  }
};
/*
This endpoint canbe triggered in the following 2 ways
1) Pass id along with request as a parameter and this will trigger the fetch_single function. This function will fetch one single bounty detail from the list
2) Simple calling the endpoint without any id as parameter will call the fetch_all() function which will fetch and return all the bounty details

*/
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (idParam) {
      const id = parseInt(idParam, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid ID provided. ID must be a number." },
          { status: 400 }
        );
      }

      const singleBounty = await fetch_single(id);
      if (!singleBounty) {
        return NextResponse.json(
          { error: `Bounty with id ${id} not found.` },
          { status: 404 }
        );
      }

      return NextResponse.json(singleBounty);
    }

    const allBounties = await fetch_all();

    if (!allBounties) {
      return NextResponse.json(
        { error: "Error fetching bounties, please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json(allBounties);

  } catch (err) {
    console.error("Unexpected error processing GET request:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}