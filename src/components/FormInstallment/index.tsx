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
import {
  Installment,
  InstallmentsContext,
} from '../../contexts/InstallmentContext';
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

interface FormInstallmentProps extends Partial<Installment> {
  handleEditDialog?: () => void;
  handleNewInstallmentDialog?: (status: boolean) => void;
}

export function FormInstallment({
  value,
  id,
  type,
  date,
  description,
  installmentCategoryId,
  handleEditDialog,
  handleNewInstallmentDialog,
}: FormInstallmentProps) {
  const { width } = useWindowSize();

  const { createNewInstallment, installmentCategories, editInstallment } =
    useContextSelector(InstallmentsContext, (context) => ({
      createNewInstallment: context.createInstallment,
      editInstallment: context.editInstallment,

      installmentCategories: context.installmentCategories.map((category) => ({
        label: category.installmentCategory,
        value: category.id,
      })),
    }));

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
      value: value ? value?.toString() : '',
      description: description ? description : '',
      type: type ? type : 'INCOME',
      ...(date && { date: new Date(date) }),
      ...(installmentCategoryId && {
        installmentCategoryId: installmentCategories.find(
          (category) => category.value === installmentCategoryId
        )?.value,
      }),
    },
  });

  async function handleNewInstallment(data: NewInstallmentFormInputs) {
    if (id) {
      editInstallment({ ...data, id });
      if (handleEditDialog) {
        handleEditDialog();
      }
      return;
    } else {
      if (handleNewInstallmentDialog) {
        handleNewInstallmentDialog(false);
      }
      createNewInstallment(data);
      reset();
    }

    return;
  }

  const valueWatch = watch('value');

  useEffect(() => {
    setValue('value', formatCurrency(valueWatch));
  }, [valueWatch, setValue]);

  return (
    <Dialog.Portal>
      <Overlay />
      <Content width={width}>
        <Dialog.Title>{id ? 'Editar' : 'Salvar'}</Dialog.Title>

        <CloseButton
          onClick={() => {
            reset();
            if (handleEditDialog) {
              handleEditDialog();
            }
            if (handleNewInstallmentDialog) {
              handleNewInstallmentDialog(false);
            }
          }}
        >
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewInstallment)}>
          <Controller
            control={control}
            name="type"
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
                defaultOption={installmentCategoryId}
              />
            )}
          />

          <Controller
            control={control}
            name="value"
            defaultValue="2"
            render={({ field }) => (
              <input type="text" placeholder="Valor" {...field} />
            )}
          />

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
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
