export type Column = {
  name: string
  description: string
}

export type TableContent = {
  title: string
  description: string
  columns: Column[]
  sqlQuery: string
}

export type Section = {
  [key: string]: Section | TableContent[]
}

export const documentationContent: Section = {
  "branch-operation": {
    conv: {
      "account-classes": [
        {
          title: "Account Classes",
          description: "",
          columns: [],
          sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
        }
      ],
      tables: [
        {
          title: "STTMS_CUST_ACCOUNT",
          description: "Includes customer account information",
          columns: [
            { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
            { name: "ac_desc", description: "Customer name" },
            { name: "cust_no", description: "Customer number" },
          ],
          sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
        },
        {
          title: "STTMS_CUSTOMER",
          description: "Consists of customer information",
          columns: [
            { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
            { name: "first_name", description: "First name of the customer" },
            { name: "middle_name", description: "Middle name of the customer" },
            { name: "last_name", description: "Last name of the customer" },
          ],
          sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
        }
      ]
    },
    ifb: {
      "account-classes": [
        {
          title: "Account Classes",
          description: "list of account classes",
          columns: [],
          sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
        }
      ],
      tables: [
        {
          title: "STTMS_CUST_ACCOUNT",
          description: "Includes customer account information",
          columns: [
            { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
            { name: "ac_desc", description: "Customer name" },
            { name: "cust_no", description: "Customer number" },
          ],
          sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
        },
        {
          title: "STTMS_CUSTOMER",
          description: "Consists of customer information",
          columns: [
            { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
            { name: "first_name", description: "First name of the customer" },
            { name: "middle_name", description: "Middle name of the customer" },
            { name: "last_name", description: "Last name of the customer" },
          ],
          sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
        }
      ]
    }
  },
  credit: {
    "account-classes": [
      {
        title: "Account Classes",
        description: "list of account classes",
        columns: [],
        sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
      }
    ],
    tables: [
      {
        title: "STTMS_CUST_ACCOUNT",
        description: "Includes customer account information",
        columns: [
          { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
          { name: "ac_desc", description: "Customer name" },
          { name: "cust_no", description: "Customer number" },
        ],
        sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
      },
      {
        title: "STTMS_CUSTOMER",
        description: "Consists of customer information",
        columns: [
          { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
          { name: "first_name", description: "First name of the customer" },
          { name: "middle_name", description: "Middle name of the customer" },
          { name: "last_name", description: "Last name of the customer" },
        ],
        sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
      }
    ]
  },
  "e-banking": {
    "account-classes": [
      {
        title: "Account Classes",
        description: "list of account classes",
        columns: [],
        sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
      }
    ],
    tables: [
      {
        title: "STTMS_CUST_ACCOUNT",
        description: "Includes customer account information",
        columns: [
          { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
          { name: "ac_desc", description: "Customer name" },
          { name: "cust_no", description: "Customer number" },
        ],
        sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
      },
      {
        title: "STTMS_CUSTOMER",
        description: "Consists of customer information",
        columns: [
          { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
          { name: "first_name", description: "First name of the customer" },
          { name: "middle_name", description: "Middle name of the customer" },
          { name: "last_name", description: "Last name of the customer" },
        ],
        sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
      }
    ]
  },
  finance: {
    "account-classes": [
      {
        title: "Account Classes",
        description: "list of account classes",
        columns: [],
        sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
      }
    ],
    tables: [
      {
        title: "STTMS_CUST_ACCOUNT",
        description: "Includes customer account information",
        columns: [
          { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
          { name: "ac_desc", description: "Customer name" },
          { name: "cust_no", description: "Customer number" },
        ],
        sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
      },
      {
        title: "STTMS_CUSTOMER",
        description: "Consists of customer information",
        columns: [
          { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
          { name: "first_name", description: "First name of the customer" },
          { name: "middle_name", description: "Middle name of the customer" },
          { name: "last_name", description: "Last name of the customer" },
        ],
        sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
      }
    ]
  },
  IBD: {
    "account-classes": [
      {
        title: "Account Classes",
        description: "list of account classes",
        columns: [],
        sqlQuery: "'OSL13', 'STL21', 'SHE15', 'SDI16', 'NOST1', 'RTG12', 'MTA01', 'CHO20'"
      }
    ],
    tables: [
      {
        title: "STTMS_CUST_ACCOUNT",
        description: "Includes customer account information",
        columns: [
          { name: "cust_ac_no", description: "Customer account number that uniquely identifies accounts" },
          { name: "ac_desc", description: "Customer name" },
          { name: "cust_no", description: "Customer number" },
        ],
        sqlQuery: "SELECT cust_ac_no, ac_desc, cust_no FROM STTMS_CUST_ACCOUNT;"
      },
      {
        title: "STTMS_CUSTOMER",
        description: "Consists of customer information",
        columns: [
          { name: "customer_no", description: "Customer number that uniquely identifies the customer" },
          { name: "first_name", description: "First name of the customer" },
          { name: "middle_name", description: "Middle name of the customer" },
          { name: "last_name", description: "Last name of the customer" },
        ],
        sqlQuery: "SELECT customer_no, first_name, middle_name, last_name FROM STTMS_CUSTOMER;"
      }
    ]
  }
}