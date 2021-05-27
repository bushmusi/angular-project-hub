
export interface BudgetDetail {
  budget_DetailID: string;
  budget_ID: string;
  budget_Type: string;
  diV_code: string;
  unit: string;
  parentBuget_Detail_ID: string;
  is_Approved: true;
  description: string;
  budget_Ammount_Birr: string;
  applicationCode? : string;
  application_NO? : string;
  docNo: string;
  innitiative_ID: string;
  budget_Allocation_Type: string
  log? : string
}



export interface Budgetsummrazed {
  budget_Summarized_ID: string;
  budget_ID: string;
  budget_Type: string;
  organization_code: string;
  parentBuget_Sum_ID: string;
  unit: string;
  is_Approved: string;
  budget_Ammount_Birr: string;
  applicationCode: string;
  application_NO: string;
  docNo: string;
  log: string;

}

export interface BudgetType {

  code?: string;
  expenditure: string;
  description: string;
  accountCode: string;
  parent: string;
  for_organization?: string;
  is_Account: string;



}

export interface Budget {
  budget_ID?: string;
  organization_code: string;
  year: string;
  total_Budget_Amount_In_Birr: string;
  statusType: string;
  applicationCode?: string;
  application_NO?: string;
  docNo?: string;
  log?: string;
}