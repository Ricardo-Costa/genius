import React from "react";

export const Congrats = ({ show }: { show: boolean }) => {
  if (!show) return <></>
  return (
    <div id="congrats">
      <div className='animate__animated animate__tada animate__infinite	infinite'>
        Congrats!!!
      </div>
    </div>
  )
}