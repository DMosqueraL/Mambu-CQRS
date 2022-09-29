import { AggregateRoot } from "@nestjs/cqrs";
import { ApproveLoanDto } from "../dto/approve-loan.dto";
import { ApprovedLoanEvent } from "../events/approved-loan.event";

export class Loan extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly _encodedKey: string,
        private readonly _accountHolderKey: string,
        private readonly _accountState: string,
        private readonly _loanName: string,
        private readonly _loanAmount: number,
      ) 
      {
        super();
      }
    
       // Metodo que aplica el evento
       approvalLoan(id: string, approveLoanDto: ApproveLoanDto){        
        this.apply(new ApprovedLoanEvent(id, approveLoanDto));
      }
      
      _Example_Custom_Fields: ExampleCustomFields;
      _Installments_Loan_Accounts: InstallmentsLoanAccounts;
      _Others_Loan_Accounts: OthersLoanAccounts;
      accountArrearsSettings: AccountArrearsSettings;
      accountSubState: string;
      activationTransactionKey: string;
      approvedDate: string;
      assets: Asset[];
      assignedBranchKey: string;
      assignedCentreKey: string;
      assignedUserKey: string;
      balances: { [key: string]: number };
      closedDate: string;
      creditArrangementKey: string;
      currency: Currency;
      daysInArrears: number;
      daysLate: number;
      disbursementDetails: CreateLoanDtoDisbursementDetails;
      fundingSources: FundingSource[];
      futurePaymentsAcceptance: string;
      guarantors: Guarantor[];
      interestAccruedInBillingCycle: number;
      interestCommission: number;
      interestFromArrearsAccrued: number;
      interestSettings: InterestSettings;
      lastAccountAppraisalDate: string;
      lastInterestAppliedDate: string;
      lastInterestReviewDate: string;
      lastLockedDate: string;
      lastSetToArrearsDate: string;
      lastTaxRateReviewDate: string;
      latePaymentsRecalculationMethod: string;
      lockedOperations: string[];
      migrationEventKey: string;
      modifyInterestForFirstInstallment: boolean;
      notes: string;
      originalAccountKey: string;
      paymentHolidaysAccruedInterest: number;
      penaltySettings: PenaltySettings;
      plannedInstallmentFees: PlannedInstallmentFee[];
      prepaymentSettings: PrepaymentSettings;
      principalPaymentSettings: PrincipalPaymentSettings;
      redrawSettings: RedrawSettings;
      rescheduledAccountKey: string;
      scheduleSettings: ScheduleSettings;
      settlementAccountKey: string;
      taxRate: number;
      terminationDate: string;
      tranches: Tranch[];
    
      public get loanAmount(): number {
        return this._loanAmount;
      }
      public get loanName(): string {
        return this._loanName;
      }
      public get accountHolderKey(): string {
        return this._accountHolderKey;
      }
      public get encodedKey(): string {
        return this._encodedKey;
      }
      public get id(): string {
        return this._id;
      }
      public get accountState(): string {
        return this._accountState;
      }
}

interface ExampleCustomFields {
    exampleCheckboxField: string;
    exampleFreeTextField: string;
    exampleNumberField: string;
    exampleSelectField: string;
  }
  
  interface InstallmentsLoanAccounts {
    Has_Many_Installments_Loan_Accou: string;
    Special_Installments_Loan_Accoun: string;
  }
  
  interface OthersLoanAccounts {
    Family_Members_Loan_Accounts: string;
    Repayment_Loan_Accounts: string;
  }
  
  interface AccountArrearsSettings {
    dateCalculationMethod: string;
    encodedKey: string;
    monthlyToleranceDay: number;
    nonWorkingDaysMethod: string;
    toleranceCalculationMethod: string;
    toleranceFloorAmount: number;
    tolerancePercentageOfOutstandingPrincipal: number;
    tolerancePeriod: number;
  }
  
  interface Asset {
    _Asset_Default_Assets: AssetDefaultAssets;
    amount: number;
    assetName: string;
    depositAccountKey: string;
    encodedKey: string;
    guarantorKey: string;
    guarantorType: string;
    originalAmount: number;
    originalCurrency: Currency;
  }
  
  interface AssetDefaultAssets {
    Example_Checkbox_Field_Assets: string;
    Example_Free_Text_Field_Assets: string;
    Example_Number_Field_Assets: string;
    Example_Select_Field_Assets: string;
  }
  
  interface Currency {
    code: string;
  }
  
  interface CreateLoanDtoDisbursementDetails {
    disbursementDate: string;
    encodedKey: string;
    expectedDisbursementDate: string;
    fees: Fee[];
    firstRepaymentDate: string;
    transactionDetails: TransactionDetails;
  }
  
  interface Fee {
    amount: number;
    encodedKey: string;
    predefinedFeeEncodedKey: string;
  }
  
  interface TransactionDetails {
    encodedKey: string;
    internalTransfer: boolean;
    targetDepositAccountKey: string;
    transactionChannelId: string;
    transactionChannelKey: string;
  }
  
  interface FundingSource {
    amount: number;
    assetName: string;
    depositAccountKey: string;
    encodedKey: string;
    guarantorKey: string;
    guarantorType: string;
    id: string;
    interestCommission: number;
    sharePercentage: number;
  }
  
  interface Guarantor {
    _Guarantor_Default_Guarantors: GuarantorDefaultGuarantors;
    amount: number;
    assetName: string;
    depositAccountKey: string;
    encodedKey: string;
    guarantorKey: string;
    guarantorType: string;
  }
  
  interface GuarantorDefaultGuarantors {
    Example_Checkbox_Guarantors: string;
    Example_Free_Text_Guarantors: string;
    Example_Number_Field_Guarantors: string;
    Example_Select_Field_Guarantors: string;
  }
  
  interface InterestSettings {
    accountInterestRateSettings: AccountInterestRateSetting[];
    accrueInterestAfterMaturity: boolean;
    accrueLateInterest: boolean;
    interestApplicationMethod: string;
    interestBalanceCalculationMethod: string;
    interestCalculationMethod: string;
    interestChargeFrequency: string;
    interestRate: number;
    interestRateReviewCount: number;
    interestRateReviewUnit: string;
    interestRateSource: string;
    interestSpread: number;
    interestType: string;
  }
  
  interface AccountInterestRateSetting {
    encodedKey: string;
    indexSourceKey: string;
    interestRate: number;
    interestRateCeilingValue: number;
    interestRateFloorValue: number;
    interestRateReviewCount: number;
    interestRateReviewUnit: string;
    interestRateSource: string;
    interestSpread: number;
    validFrom: string;
  }
  
  interface PenaltySettings {
    loanPenaltyCalculationMethod: string;
    penaltyRate: number;
  }
  
  interface PlannedInstallmentFee {
    amount: number;
    applyOnDate: string;
    encodedKey: string;
    installmentKey: string;
    installmentNumber: number;
    predefinedFeeKey: string;
  }
  
  interface PrepaymentSettings {
    applyInterestOnPrepaymentMethod: string;
    elementsRecalculationMethod: string;
    prepaymentRecalculationMethod: string;
    principalPaidInstallmentStatus: string;
  }
  
  interface PrincipalPaymentSettings {
    amount: number;
    encodedKey: string;
    includeFeesInFloorAmount: boolean;
    includeInterestInFloorAmount: boolean;
    percentage: number;
    principalCeilingValue: number;
    principalFloorValue: number;
    principalPaymentMethod: string;
    totalDueAmountFloor: number;
    totalDuePayment: string;
  }
  
  interface RedrawSettings {
    restrictNextDueWithdrawal: boolean;
  }
  
  interface ScheduleSettings {
    billingCycle: BillingCycle;
    defaultFirstRepaymentDueDateOffset: number;
    fixedDaysOfMonth: number[];
    gracePeriod: number;
    gracePeriodType: string;
    hasCustomSchedule: boolean;
    paymentPlan: PaymentPlan[];
    periodicPayment: number;
    previewSchedule: PreviewSchedule;
    principalRepaymentInterval: number;
    repaymentInstallments: number;
    repaymentPeriodCount: number;
    repaymentPeriodUnit: string;
    repaymentScheduleMethod: string;
    scheduleDueDatesMethod: string;
    shortMonthHandlingMethod: string;
  }
  
  interface BillingCycle {
    days: number[];
  }
  
  interface PaymentPlan {
    amount: number;
    encodedKey: string;
    toInstallment: number;
  }
  
  interface PreviewSchedule {
    numberOfPreviewedInstalments: number;
  }
  
  interface Tranch {
    amount: number;
    disbursementDetails: TranchDisbursementDetails;
    encodedKey: string;
    fees: Fee[];
    trancheNumber: number;
  }
  
  interface TranchDisbursementDetails {
    disbursementTransactionKey: string;
    expectedDisbursementDate: string;
  }
