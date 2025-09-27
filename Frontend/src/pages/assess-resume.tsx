import { useMutation } from "@tanstack/react-query";
import { assessResumeAPI } from "../api/job.api";
import { useParams } from "react-router";
import ImageInput from "../components/inputs/image-input";
import { FormProvider, useForm } from "react-hook-form";
import { withAuth } from "../hoc/with-auth.hoc";
import { Role } from "../types/enum.types";
import toast from "react-hot-toast";

const AssessResumePage = () => {
  const params = useParams();
  const jobId = params.jobId;

  const methods = useForm({
    defaultValues: {},
    mode: "all",
  });

  const { mutate, isPending, data } = useMutation({
    mutationFn: (formdata: any) => assessResumeAPI(jobId!, formdata),
    mutationKey: [`assess_resume_key`, jobId],
    onError: (error) => {
      console.log(error);
      toast.error(error?.message ?? "Something went wrong", {
        style: {
          border: " 1px solid #2c3e50",
          padding: ".5rem",
        },
        iconTheme: {
          primary: "#2c3e50",
          secondary: "#FFFAEE",
        },
      });
    },
  });

  const onSubmit = (data: any) => {
    const { resume } = data;

    const formdata = new FormData();
    formdata.append("resume", resume);

    mutate(formdata);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form className="h-screen" onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Resume */}
          <p className="text-gray-500 text-center mt-4 text-2xl p-3">
            Upload Resume to see your resume score & get reccomendations.
          </p>
          <div className="w-[80vw] xl:w-[60vw] mx-auto">
            <ImageInput id="resume" name="resume" label="" />
          </div>

          {/* Submit application button */}
          <div className="flex items-center justify-center">
            <button className="border bg-[#2c3e50] text-white w-[80vw] xl:w-[60vw] font-bold py-2 rounded-md hover:bg-[#3a4753] hover:cursor-pointer disabled:bg-[#3a4753] disabled:cursor-not-allowed">
              {isPending ? "Fetching your results" : "See my Score"}
            </button>
          </div>

          {/* Score box */}
          <div className="flex mx-auto justify-center mt-6 rounded-md border border-[#E9EBED] w-[80vw] xl:w-[60vw]">
            <div>
              <p className="text-2xl text-gray-600 text-center">
                Your resume score against job:
              </p>
              <p
                className={`text-4xl text-center mt-4 pb-10 ${
                  data?.score < 60
                    ? "text-[#d4183d]"
                    : data?.score >= 60 && data?.score < 80
                    ? "text-amber-600"
                    : "text-green-800"
                }`}
              >
                {data?.score ? `${data.score}%` : "--"}
              </p>
            </div>
          </div>

          {/* Reccomendations box */}
          <div className="flex mx-auto mt-6 rounded-md border border-[#E9EBED] w-[80vw] xl:w-[60vw] p-4">
            <div>
              <p className="text-2xl text-gray-600">
                Here are some reccomendations to improve your resume:
              </p>
              {Array.isArray(data?.tips) ? (
                <ul className="list-disc ml-6 mt-4 text-gray-500">
                  {data.tips.map((tip: string, idx: number) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg mt-4 pb-10 text-gray-500">{data?.tips}</p>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const page = withAuth(AssessResumePage, [Role.ADMIN, Role.SEEKER]);
export default page;
