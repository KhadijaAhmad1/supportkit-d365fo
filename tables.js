// SupportKit for D365 F&O — bundled table reference
// Curated list of standard Dynamics 365 Finance & Operations tables,
// grouped by module, for quick opening in SysTableBrowser.
// Users can add their own custom tables via Options.

const SK_TABLES = [
  // ── Sales & Accounts Receivable ────────────────────────────────
  { n: "SalesTable", d: "Sales order headers", m: "Sales" },
  { n: "SalesLine", d: "Sales order lines", m: "Sales" },
  { n: "SalesQuotationTable", d: "Sales quotation headers", m: "Sales" },
  { n: "SalesQuotationLine", d: "Sales quotation lines", m: "Sales" },
  { n: "CustTable", d: "Customer master", m: "Sales" },
  { n: "CustGroup", d: "Customer groups", m: "Sales" },
  { n: "CustTrans", d: "Customer transactions", m: "Sales" },
  { n: "CustTransOpen", d: "Open (unsettled) customer transactions", m: "Sales" },
  { n: "CustSettlement", d: "Customer settlements", m: "Sales" },
  { n: "CustInvoiceJour", d: "Customer invoice journal (posted headers)", m: "Sales" },
  { n: "CustInvoiceTrans", d: "Customer invoice lines (posted)", m: "Sales" },
  { n: "CustConfirmJour", d: "Sales confirmation journal", m: "Sales" },
  { n: "CustPackingSlipJour", d: "Packing slip headers (posted)", m: "Sales" },
  { n: "CustPackingSlipTrans", d: "Packing slip lines (posted)", m: "Sales" },
  { n: "CustParameters", d: "AR parameters", m: "Sales" },

  // ── Procurement & Accounts Payable ─────────────────────────────
  { n: "PurchTable", d: "Purchase order headers", m: "Procurement" },
  { n: "PurchLine", d: "Purchase order lines", m: "Procurement" },
  { n: "PurchReqTable", d: "Purchase requisition headers", m: "Procurement" },
  { n: "PurchReqLine", d: "Purchase requisition lines", m: "Procurement" },
  { n: "PurchRFQTable", d: "Request for quotation headers", m: "Procurement" },
  { n: "PurchAgreementHeader", d: "Purchase agreements", m: "Procurement" },
  { n: "VendTable", d: "Vendor master", m: "Procurement" },
  { n: "VendGroup", d: "Vendor groups", m: "Procurement" },
  { n: "VendTrans", d: "Vendor transactions", m: "Procurement" },
  { n: "VendTransOpen", d: "Open (unsettled) vendor transactions", m: "Procurement" },
  { n: "VendSettlement", d: "Vendor settlements", m: "Procurement" },
  { n: "VendInvoiceJour", d: "Vendor invoice journal (posted headers)", m: "Procurement" },
  { n: "VendInvoiceTrans", d: "Vendor invoice lines (posted)", m: "Procurement" },
  { n: "VendPackingSlipJour", d: "Product receipt headers (posted)", m: "Procurement" },
  { n: "PurchParameters", d: "AP / procurement parameters", m: "Procurement" },

  // ── Inventory & Product ────────────────────────────────────────
  { n: "InventTable", d: "Released products (item master)", m: "Inventory" },
  { n: "InventTrans", d: "Inventory transactions", m: "Inventory" },
  { n: "InventTransOrigin", d: "Inventory transaction origins", m: "Inventory" },
  { n: "InventSum", d: "On-hand inventory summary", m: "Inventory" },
  { n: "InventDim", d: "Inventory dimension combinations", m: "Inventory" },
  { n: "InventItemGroup", d: "Item groups", m: "Inventory" },
  { n: "InventModelGroup", d: "Item model groups", m: "Inventory" },
  { n: "InventLocation", d: "Warehouses", m: "Inventory" },
  { n: "InventSite", d: "Sites", m: "Inventory" },
  { n: "InventBatch", d: "Batch numbers", m: "Inventory" },
  { n: "InventSerial", d: "Serial numbers", m: "Inventory" },
  { n: "InventJournalTable", d: "Inventory journal headers", m: "Inventory" },
  { n: "InventJournalTrans", d: "Inventory journal lines", m: "Inventory" },
  { n: "InventTransferTable", d: "Transfer order headers", m: "Inventory" },
  { n: "InventTransferLine", d: "Transfer order lines", m: "Inventory" },
  { n: "EcoResProduct", d: "Product master (shared)", m: "Inventory" },
  { n: "EcoResProductMaster", d: "Product masters with variants", m: "Inventory" },

  // ── Warehouse Management (WHS) ─────────────────────────────────
  { n: "WHSWorkTable", d: "Warehouse work headers", m: "Warehouse" },
  { n: "WHSWorkLine", d: "Warehouse work lines", m: "Warehouse" },
  { n: "WHSLoadTable", d: "Load headers", m: "Warehouse" },
  { n: "WHSLoadLine", d: "Load lines", m: "Warehouse" },
  { n: "WHSShipmentTable", d: "Shipments", m: "Warehouse" },
  { n: "WHSWaveTable", d: "Waves", m: "Warehouse" },
  { n: "WHSContainerTable", d: "Containers", m: "Warehouse" },
  { n: "WMSLocation", d: "Warehouse locations", m: "Warehouse" },

  // ── General Ledger & Finance ───────────────────────────────────
  { n: "LedgerJournalTable", d: "General journal headers", m: "Finance" },
  { n: "LedgerJournalTrans", d: "General journal lines", m: "Finance" },
  { n: "GeneralJournalEntry", d: "Posted journal entries (headers)", m: "Finance" },
  { n: "GeneralJournalAccountEntry", d: "Posted journal entries (account lines)", m: "Finance" },
  { n: "MainAccount", d: "Main accounts", m: "Finance" },
  { n: "DimensionAttribute", d: "Financial dimension attributes", m: "Finance" },
  { n: "DimensionAttributeValue", d: "Financial dimension values", m: "Finance" },
  { n: "DimensionAttributeValueSet", d: "Dimension value combinations", m: "Finance" },
  { n: "TaxTable", d: "Sales tax codes", m: "Finance" },
  { n: "TaxTrans", d: "Sales tax transactions", m: "Finance" },
  { n: "BankAccountTable", d: "Bank accounts", m: "Finance" },
  { n: "BankAccountTrans", d: "Bank transactions", m: "Finance" },
  { n: "Currency", d: "Currencies", m: "Finance" },
  { n: "ExchangeRate", d: "Exchange rates", m: "Finance" },

  // ── Production & BOM ───────────────────────────────────────────
  { n: "ProdTable", d: "Production order headers", m: "Production" },
  { n: "ProdBOM", d: "Production BOM lines", m: "Production" },
  { n: "ProdRoute", d: "Production route operations", m: "Production" },
  { n: "ProdJournalTable", d: "Production journal headers", m: "Production" },
  { n: "BOMTable", d: "BOM headers", m: "Production" },
  { n: "BOMVersion", d: "BOM versions", m: "Production" },
  { n: "BOM", d: "BOM lines", m: "Production" },
  { n: "RouteTable", d: "Route headers", m: "Production" },
  { n: "RouteOpr", d: "Route operations", m: "Production" },

  // ── Planning ───────────────────────────────────────────────────
  { n: "ReqTrans", d: "Net requirement transactions", m: "Planning" },
  { n: "ReqPO", d: "Planned orders", m: "Planning" },

  // ── Projects ───────────────────────────────────────────────────
  { n: "ProjTable", d: "Project master", m: "Projects" },
  { n: "ProjInvoiceJour", d: "Project invoice journal", m: "Projects" },

  // ── HR & Global Address Book ───────────────────────────────────
  { n: "HcmWorker", d: "Workers (employees/contractors)", m: "HR & Party" },
  { n: "HcmEmployment", d: "Worker employments", m: "HR & Party" },
  { n: "DirPartyTable", d: "Global address book parties", m: "HR & Party" },
  { n: "LogisticsPostalAddress", d: "Postal addresses", m: "HR & Party" },
  { n: "LogisticsElectronicAddress", d: "Electronic addresses (email/phone)", m: "HR & Party" },
  { n: "OMOperatingUnit", d: "Operating units", m: "HR & Party" },
  { n: "CompanyInfo", d: "Legal entities", m: "HR & Party" },

  // ── Commerce / Retail ──────────────────────────────────────────
  { n: "RetailTransactionTable", d: "Retail transactions (headers)", m: "Commerce" },
  { n: "RetailTransactionSalesTrans", d: "Retail transaction sales lines", m: "Commerce" },
  { n: "RetailChannelTable", d: "Retail channels", m: "Commerce" },
  { n: "RetailStoreTable", d: "Retail stores", m: "Commerce" },

  // ── System, Admin & Support ────────────────────────────────────
  { n: "UserInfo", d: "System users", m: "System" },
  { n: "SecurityRole", d: "Security roles", m: "System" },
  { n: "SecurityUserRole", d: "User ↔ role assignments", m: "System" },
  { n: "SysTableIdView", d: "Table ID ↔ table name lookup (view)", m: "System" },
  { n: "SysUserLog", d: "User login log", m: "System" },
  { n: "SysDatabaseLog", d: "Database log (audit trail)", m: "System" },
  { n: "SysOutgoingEmailTable", d: "Outgoing email queue", m: "System" },
  { n: "BatchJob", d: "Batch job headers", m: "System" },
  { n: "Batch", d: "Batch tasks", m: "System" },
  { n: "BatchJobHistory", d: "Batch job execution history", m: "System" },
  { n: "DocuRef", d: "Document attachments (references)", m: "System" },
  { n: "DocuValue", d: "Document attachment file values", m: "System" },
  { n: "DocuType", d: "Document types", m: "System" },
  { n: "NumberSequenceTable", d: "Number sequences", m: "System" },
  { n: "NumberSequenceList", d: "Number sequence status list", m: "System" },
  { n: "WorkflowTable", d: "Workflow definitions", m: "System" },
  { n: "WorkflowTrackingStatusTable", d: "Workflow tracking / instance status", m: "System" },
  { n: "SysLastValue", d: "User usage data (saved filters, per-user state)", m: "System" },

  // ── Data Management & Integration ──────────────────────────────
  { n: "DMFDefinitionGroup", d: "Data management projects", m: "Integration" },
  { n: "DMFDefinitionGroupExecution", d: "Data project executions", m: "Integration" }
];
