import { Payment, columns } from "./Column"
import { DataTable } from "./data-table"



export default function Admin() {

  const data:Payment[] =   [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
