import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { UserAuth } from "./../components/AuthContext";

export const NewRadioGroup = ({ answers, removeSpecChar }) => {
  const { selected, setSelected } = UserAuth();
  const { score, setScore } = UserAuth();

  // const [selected, setSelected] = useState(null);
  //removeSpecChar(answers[0])

  // getSelected(selected);

  // const Message = (currencyOne, currencyTwo) => {
  //   console.log(`This much of ${currencyOne} gets you ${currencyTwo}`);
  // };
  // props.func(Message, exchange);
  const handleSelected = (selected) => {
    setSelected(selected);
  };

  return (
    <div className="w-full px-4 py-16">
      <div className="mb-3">
        <h1 className="heading-1 flex flex-col justify-center items-center">
          <span className="text-2xl text-white badge badge-lg bg-blue-600 p-10">
            Score = {score}
          </span>
        </h1>
      </div>
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={handleSelected}>
          <RadioGroup.Label className="sr-only"></RadioGroup.Label>
          <div className="space-y-2">
            {answers.map((answer) => (
              <RadioGroup.Option
                key={answer}
                value={removeSpecChar(answer)}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-lg">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {removeSpecChar(answer)}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span></span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
