import {
    consoleIs,
    definesVariable,
    variablePrinted,
    definesAndReassignsVariable,
} from "@/scripts/goal-checker-functions.mjs";

const goals = [
    {
        name: "Definir una variable",
        description:
            "Observa el siguiente ejemplo con atención y luego presiona en el icono de 'play' para ejecutar el código.",
        completed: false,
        successMessage:
            "Hemos definido una variable 'nombre' con el valor 'Pedro' y esto lo imprimos por consola.",
        test: () => consoleIs("Nombre: Pedro"),
    },
    {
        name: "Crear una nueva variable",
        description:
            "Ahora te toca a vos, define una variable 'apellido' con el valor 'Torres' y muestra su valor en la consola.",
        completed: false,
        successMessage:
            "Genial! Ahora ya sabes como crear variables y como utilizar su contenido.",
        test: () => {
            const expectedVariable = {
                type: "let",
                name: "apellido",
                value: "Torres",
            };
            return (
                definesVariable(expectedVariable) &&
                variablePrinted(expectedVariable)
            );
        },
        clues: [
            "Para definir una variable usamos la palabra 'let' seguido del nombre de la variable",
            "Para asignar el valor utilizamos el operador '=' (asignación) seguido del valor",
            "Para leer el valor simplemente escribimos el nombre de la variable",
            "Ten en cuenta las mayúsculas y minúsculas",
            "Usa el formato del ejemplo",
        ],
    },
    {
        name: "Modificar el valor de una variable",
        description: `Modifica el valor de la variable 'nombre' para que sea 'Juan'.\n
            Debajo del código existente, escribe nombre = 'Juan' y vuelve a mostrar el valor de la variable en la consola.`,
        completed: false,
        successMessage:
            "Genial! Ahora ya sabes como modificar el valor de una variable.",
        test: () => {
            const expectedVariable = {
                type: "let",
                name: "nombre",
                value: "Pedro",
            };

            const newExpectedValue = "Juan";
            return (
                definesAndReassignsVariable(
                    expectedVariable,
                    newExpectedValue,
                ) && variablePrinted({ ...expectedVariable, value: "Juan" })
            );
        },
    },
];

export default goals;