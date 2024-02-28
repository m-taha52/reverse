import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation"
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { Plan } from '@prisma/client'

const page = async ({searchParams} : {searchParams: {plan: Plan; state: string; code: string} }) => {

  const agencyId = await verifyAndAcceptInvitation();
  console.log(agencyId);

  // get users details
  //their access will determine if they should stay on this page or get redirected to a subaccount

  const user = await getAuthUserDetails();
  if (agencyId)
  {
    if(user?.role === "SUBACCOUNT_GUEST" || user?.role === 'SUBACCOUNT_USER')
    {
      return redirect('/subaccount')
    }
    else if (user?.role === 'AGENCY_ADMIN' || user?.role === "AGENCY_OWNER")
    {
      if (searchParams.plan)
      {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }
      if(searchParams.state)
      {
        const statePath = searchParams.state.split('__')[0];
        const stateAgencyId = searchParams.state.split("__")[1];
        if(!stateAgencyId) 
        {
          return <div> Not Authorized </div>
        }
        return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
      }
      else {
        return redirect(`/agency/${agencyId}`)
      }
    }
    else {
      return <div> Not Authorized </div>
    }
  }
  return (
    <div>agency</div>
  )
}



export default page