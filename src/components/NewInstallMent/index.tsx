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
import { SelectCreatable } from '../Select';
import { useWindowSize } from '../../hooks/useWindowSize';

const newInstallmentFormSchema = z.object({
  description: z.optional(z.string()),
  value: z.string().min(3),
  installmentCategoryId: z.string(),
  date: z.date(),
  type: z.enum(['INCOME', 'OUTCOME']),
});

type NewInstallmentFormInputs = z.infer<typeof newInstallmentFormSchema>;

export function NewInstallmentModal() {
  const { width } = useWindowSize();

  const createNewInstallment = useContextSelector(
    InstallmentsContext,
    (context) => context.createInstallment
  );

  const installmentCategories = useContextSelector(
    InstallmentsContext,
    (context) => {
      context.installmentCategories;

      return context.installmentCategories.map((category) => ({
        label: category.installmentCategory,
        value: category.id,
      }));
    }
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
      installmentCategoryId: '',
      value: '',
      description: '',
      type: 'INCOME',
    },
  });

  async function handleNewInstallment(data: NewInstallmentFormInputs) {
    createNewInstallment(data);
  }

  const valueWatch = watch('value');

  useEffect(() => {
    return setValue('value', formatCurrency(valueWatch));
  }, [valueWatch, setValue]);

  return (
    <Dialog.Portal>
      <Overlay />
      <Content width={width}>
        <Dialog.Title>Adicionar</Dialog.Title>

        <CloseButton onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewInstallment)}>
          <Controller
            control={control}
            {...register('type')}
            render={({ field }) => (
              <InstallmentType
                onValueChange={field.onChange}
                value={field.value}
              >
                <InstallmentTypeButton variant="INCOME" value="INCOME">
                  Receita <ArrowCircleUp size={24} />
                </InstallmentTypeButton>
                <InstallmentTypeButton variant="OUTCOME" value="OUTCOME">
                  Despesa <ArrowCircleDown size={24} />
                </InstallmentTypeButton>
              </InstallmentType>
            )}
          />

          <Controller
            control={control}
            name="installmentCategoryId"
            render={({ field }) => (
              <SelectCreatable
                options={installmentCategories}
                placeholder="Selecione ou Insira Nova Categoria"
                createNewIOptionLabel="Criar Categoria"
                {...field}
              />
            )}
          />

          <input type="text" placeholder="Valor" {...register('value')} />

          <input
            type="text"
            placeholder="Descrição (opcional)"
            {...register('description')}
          />

          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DateInput
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                placeholder="Selecione Mês e Ano"
                {...field}
              />
            )}
          />

          <button type="submit" disabled={isSubmitting}>
            Adicionar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
