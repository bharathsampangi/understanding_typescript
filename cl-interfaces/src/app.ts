class Department {
  constructor(private readonly id: string, public name: string) {
    //this.id = id;
    //this.name = name;
  }
  protected employees: string[] = [];
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Accounts");
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}

const accounting = new ITDepartment("d1", ["Max"]);
accounting.addEmployee("Max");
accounting.addEmployee("Bharath");

//accounting.employees[2] = "Anna";
//accounting.name = "Development";

accounting.describe();
accounting.printEmployeeInformation();
console.log(accounting);

//const accountingCopy = { name: "DUMMY", describe: accounting.describe };
///accountingCopy.describe();

const acc = new AccountingDepartment("d2", []);
acc.addReport("Something went wrong...");
acc.addEmployee("Max");
acc.addEmployee("Sharath");
acc.printReports();
acc.printEmployeeInformation();
