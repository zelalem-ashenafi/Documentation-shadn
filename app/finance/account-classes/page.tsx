// app/branch-operation/conventional/tables/page.tsx
export default function ConventionalTablesPage() {
  return (
    <div className="p-8">
      {/* Breadcrumb / Path */}
      <nav className="text-sm text-gray-500 mb-6">
        <span>Branch Operation</span> &gt; 
        <span> Conventional</span> &gt; 
        <span className="font-medium text-gray-900"> Tables</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Conventional Tables Documentation</h1>
      <p className="text-gray-600 mb-8">
        Below are the available tables and their respective column details.
      </p>

      {/* Table Documentation */}
      <div className="space-y-8">
        {/* STTMS_CUST_ACCOUNT */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            STTMS_CUST_ACCOUNT <span className="text-sm font-normal text-gray-500">(includes customer account information)</span>
          </h2>
          <h3 className="text-gray-700 font-medium">Columns</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>
              <span className="font-semibold">cust_ac_no</span>: the customer account number that uniquely identifies accounts
            </li>
            <li>
              <span className="font-semibold">ac_desc</span>: the customer name
            </li>
            <li>
              <span className="font-semibold">cust_no</span>: the customer number
            </li>
          </ul>
        </section>

        {/* STTMS_CUSTOMER */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            STTMS_CUSTOMER <span className="text-sm font-normal text-gray-500">(consists of the customer information)</span>
          </h2>
          <h3 className="text-gray-700 font-medium">Columns</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>
              <span className="font-semibold">customer_no</span>: the customer number that uniquely identifies the customer
            </li>
            <li>
              <span className="font-semibold">First Name</span>: the first name of the customer
            </li>
            <li>
              <span className="font-semibold">Middle Name</span>: the middle name of the customer
            </li>
            <li>
              <span className="font-semibold">Last Name</span>: the last name of the customer
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
