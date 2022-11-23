import React from "react";
import ReactDOM from "react-dom";
import { trpc } from "../utils/trpc";
import type { Employee } from "./TableColums";
import TextInput from "./TextInput";

type Props = {
  handleModalClose: () => void;
  isOpen: boolean;
};

export const EmployeeFormModal = ({ handleModalClose, isOpen }: Props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const utils = trpc.useContext();
  const { mutateAsync, error } = trpc.employees.addEmployee.useMutation({
    onSettled() {
      utils.employees.allEmployees.invalidate();
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const employeeData = Object.fromEntries(formData) as Employee;

    try {
      await mutateAsync(employeeData);

      formRef.current?.reset();
    } catch (err) {
      console.log(error?.message);
    }
  };

  return typeof window !== "undefined" ? (
    ReactDOM.createPortal(
      <>
        {isOpen && (
          <div className="backdrop absolute inset-0 top-0 flex h-full w-full justify-center bg-black/40">
            <form
              className="mx-auto mt-10 flex h-min w-1/3 flex-col rounded bg-slate-800 p-10 text-center text-white"
              onSubmit={onSubmit}
              ref={formRef}
            >
              <div className="flex flex-row items-center justify-between ">
                <h5 className="text-center text-xl font-medium">
                  Create New Employee
                </h5>
                <button
                  className="rounded p-3 text-white hover:bg-red-600"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>

              <div className="mt-5 space-y-10">
                <TextInput label="Name" name="name" id="name" />
                <TextInput label="Surname" name="surname" id="surname" />
                <TextInput label="Address" name="address" id="address" />
                <TextInput label="Phone" name="phone" id="phone" />
                <TextInput label="Email" name="email" id="email" />
                <TextInput
                  type="date"
                  label="Birth Date"
                  name="birthdate"
                  id="birthdate"
                />
              </div>
              <button
                className="mr-1 mb-1 mt-10 w-full rounded bg-green-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-green-600 hover:shadow-lg focus:outline-none active:bg-slate-600"
                type="submit"
              >
                submit
              </button>
            </form>
          </div>
        )}
      </>,
      //eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      document.getElementById("modal-portal")!
    )
  ) : (
    <div></div>
  );
};

export default EmployeeFormModal;