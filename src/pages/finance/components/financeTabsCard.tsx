import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import BillingTable from "./tables/billingTable";
import PaymentTable from "./tables/paymentTable";

function FinanceTabsCard( { patientData }) {
  return (
    <div className="bg-white rounded-[.5rem] py-5 w-full h-full">
      <Tabs defaultValue="Billing">
        <div className="border-b">
          <TabsList>
            <TabsTrigger value="Billing">Billing</TabsTrigger>
          </TabsList>
          <TabsList>
            <TabsTrigger value="Reciepts">Reciepts</TabsTrigger>
          </TabsList>
        </div>
        <div className="px-5">
          <TabsContent value="Billing">
            <BillingTable />
          </TabsContent>
          <TabsContent value="Reciepts">
            <PaymentTable patientData={patientData} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default FinanceTabsCard;
