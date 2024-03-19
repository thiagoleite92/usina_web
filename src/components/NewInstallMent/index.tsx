import { z } from 'zod';
import * as Dialog from '@radix-ui/react-dialog';
import {
  CloseButton,
  Content,
  Overlay,
  InstallmentType,
  InstallmentTypeButton,
} from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { InstallmentsContext } from '../../contexts/InstallmentContext';
import { DateInput } from '../DatePicker';
import { useEffect } from 'react';
import { formatCurrency } from '../../utils/formatter';

const newInstallmentFormSchema = z.object({
  description: z.string().min(1).max(50),
  value: z.string(),
  installment: z.string().min(3).max(50),
  date: z.date(),
  type: z.enum(['INCOME', 'OUTCOME']),
});

type NewInstallmentFormInputs = z.infer<typeof newInstallmentFormSchema>;

export function NewInstallmentModal() {
  const createNewInstallment = useContextSelector(
    InstallmentsContext,
    (context) => context.createInstallment
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,

    formState: { isSubmitting },
  } = useForm<NewInstallmentFormInputs>({
    resolver: zodResolver(newInstallmentFormSchema),
    defaultValues: {
      installment: '',
      value: '',
      description: '',
      type: 'INCOME',
    },
  });

  async function handleNewInstallment(data: NewInstallmentFormInputs) {
    createNewInstallment(data);

    reset();
  }

  const valueWatch = watch('value');

  useEffect(() => {
    return setValue('value', formatCurrency(valueWatch));
  }, [valueWatch, setValue]);

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Prestação</Dialog.Title>

        <CloseButton onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewInstallment)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          <input type="text" placeholder="Valor" {...register('value')} />
          <input
            type="text"
            placeholder="Categoria"
            {...register('installment')}
          />

          <Controller
            control={control}
            name="date"
            render={({ field }) => <DateInput {...field} />}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <InstallmentType
                onValueChange={field.onChange}
                value={field.value}
              >
                <InstallmentTypeButton variant="INCOME" value="INCOME">
                  Entrada <ArrowCircleUp size={24} />
                </InstallmentTypeButton>
                <InstallmentTypeButton variant="OUTCOME" value="OUTCOME">
                  Saída <ArrowCircleDown size={24} />
                </InstallmentTypeButton>
              </InstallmentType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
