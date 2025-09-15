import { z } from 'zod';
import { intervalToDuration, isValid, startOfDay, isBefore } from 'date-fns';
import DateForm from './components/DateForm';

const birthdayValidationSchema = z.object({
    day: z.coerce.number().refine(val => !isNaN(val), { message: "Obrigatório" }).min(1, "Dia inválido").max(31, "Dia inválido"),
    month: z.coerce.number().refine(val => !isNaN(val), { message: "Obrigatório" }).min(1, "Mês inválido").max(12, "Mês inválido")
});

type BirthdayFormData = z.infer<typeof birthdayValidationSchema>;

export default function BirthdayCountdownPage() {
    const calculateTimeToBirthday = (data: BirthdayFormData) => {
        const today = startOfDay(new Date());
        const currentYear = today.getFullYear();

        // Cria a data do aniversário neste ano
        let nextBirthday = startOfDay(new Date(currentYear, data.month - 1, data.day));

        // Se já passou, ajusta para o próximo ano
        if (isBefore(nextBirthday, today)) {
            nextBirthday = startOfDay(new Date(currentYear + 1, data.month - 1, data.day));
        }

        const duration = intervalToDuration({ start: today, end: nextBirthday });

        return {
            val1: duration.years || 0,
            val2: duration.months || 0,
            val3: duration.days || 0,
        };
    };

    return (
        <DateForm
            validationSchema={birthdayValidationSchema}
            onSubmitCalculation={calculateTimeToBirthday}
            title="Contagem para o Aniversário"
            resultLabels={{ part1: 'anos', part2: 'meses', part3: 'dias'}}
        />
    );
}
