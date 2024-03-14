import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";


const Tables = () => {
    return (
        <div className="mt-5 h-full">
            <DevelopmentTable
                columnsData={columnsDataDevelopment}
                tableData={tableDataDevelopment}
            />
        </div>
    );
};

export default Tables;
