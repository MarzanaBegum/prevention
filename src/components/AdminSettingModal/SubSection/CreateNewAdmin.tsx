import api from '@/api';
import Loading from '@/components/Loading';
import { useAdminData } from '@/context/AdminData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CustomInput from '../CustomInput';

interface Props {
  setOpen: (open: boolean) => void;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  setSectionState: (sectionState: string) => void;
}

const DataSchema = yup.object().shape({
  firstName: yup.string().required('First name is required field'),
  lastName: yup.string().required('Last name is required field'),
  email: yup.string().required('Email is required field'),
  username: yup.string().required('Username is required field'),
});

const CreateNewAdmin = ({
  setOpen,
  setIsDropdownOpen,
  setSectionState,
}: Props) => {
  // state
  const [isLoading, setLoading] = useState<boolean>(false);

  // hooks
  const { profileData, refetchProfileData } = useAdminData();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(DataSchema),
  });

  const onSubmit = async (data: any) => {
    if (isLoading) return;
    try {
      setLoading(true);
      await api.post('/v3/user/request-admin', {
        ...data,
        email: data.email.toLowerCase().trim(),
      });
      setLoading(false);
      toast.success('Request send successfully');
      setSectionState('personal-information');
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response ? err.response.data?.message : err.message);
    }
  };
  return (
    <>
      <div className=" bg-[#F2EBF9] md:rounded-[12px]">
        <div className="px-[20px] md:px-[30px] py-[20px] md:py-[30px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[30px]">
              <div className="flex gap-[20px]">
                <div className="w-full">
                  <CustomInput
                    {...register('firstName')}
                    label="First Name"
                    placeholder="First Name"
                    className="border border-[#E5DDED] !rounded-[6px]"
                  />
                  {errors.firstName && (
                    <p className="text-[14px] text-[red]">
                      {errors?.firstName?.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <CustomInput
                    {...register('lastName')}
                    label="Last Name"
                    placeholder="Last Name"
                    className="border border-[#E5DDED] !rounded-[6px]"
                  />
                  {errors.lastName && (
                    <p className="text-[14px] text-[red]">
                      {errors?.lastName?.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-[20px]">
                <div className="w-full">
                  <CustomInput
                    {...register('username')}
                    label="User Name"
                    placeholder="username"
                    className="border border-[#E5DDED] !rounded-[6px]"
                  />
                  {errors.username && (
                    <p className="text-[14px] text-[red]">
                      {errors?.username?.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <CustomInput
                    {...register('email')}
                    label="Email"
                    placeholder="email"
                    className="border border-[#E5DDED] !rounded-[6px]"
                  />
                  {errors.email && (
                    <p className="text-[14px] text-[red]">
                      {errors?.email?.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-[40px] flex justify-center md:justify-end gap-[20px]">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsDropdownOpen(false);
                }}
                className="w-[150px] h-[47px] text-[16px] border border-primary bg-white hover:bg-[#522580] transition-all duration-200 text-primary hover:text-[#FFFFFF] font-semibold cursor-pointer rounded-[6px] text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[150px] h-[47px] text-[16px] font-semibold cursor-pointer rounded-[6px] bg-primary hover:bg-[#522580] transition-all duration-200 text-[#FFFFFF] text-center"
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <Loading color="white" />
                  </div>
                ) : (
                  'Create'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewAdmin;
