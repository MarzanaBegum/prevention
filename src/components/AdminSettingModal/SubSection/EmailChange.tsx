import api from '@/api';
import Loading from '@/components/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CustomInput from '../CustomInput';

interface Props {
  setSectionState: (sectionState: string) => void;
  setChangedEmail: (changeEmail: string) => void;
}

const DataSchema = yup.object().shape({
  email: yup.string().required('email is required field'),
});
const EmailChange = ({ setSectionState, setChangedEmail }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(DataSchema),
  });

  console.log(getValues());

  /* Submit form */
  const onSubmit = async (data: any) => {
    setLoading(true);
    setChangedEmail(data.email);
    // form active

    try {
      const response = await api.post('/v3/user/send-verification-code', {
        email: data.email,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
        setSectionState('change-email-otp');
      } else {
        toast.error('Something went wrong !');
        setLoading(false);
      }
    } catch (err: any) {
      toast.error(err?.response ? err.response.data?.message : err.message);
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#F2EBF9] rounded-[12px] h-auto">
      <div className="p-[40px]">
        <div className="max-w-[424px] mx-auto text-center">
          <h2 className="text-[#444444] font-medium text-[32px] leading-[38px]">
            Change your Email
          </h2>
          <p className="mt-[16px] text-primary-text font-normal text-[16px] leading-[24px]">
            Enter your email address and we will send you link to reset your
            password.
          </p>
        </div>

        {/* input field  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-[472px] mx-auto mt-[40px]">
            <CustomInput
              {...register('email')}
              label="Enter your new email"
              placeholder="Email address"
              className="border border-[#E5DDED] !rounded-[6px]"
            />
            {errors.email && (
              <p className="text-[14px] text-[red]">
                {errors?.email?.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-[40px] flex justify-center md:justify-end gap-[20px]">
            <button
              type="button"
              onClick={() => {
                setSectionState('personal-information');
                // setIsDropdownOpen(false);
              }}
              className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loading color="#fff" />
                  <div>Loading...</div>
                </div>
              ) : (
                'Next'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailChange;
