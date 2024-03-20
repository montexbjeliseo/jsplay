import {
    consoleIs,
    definesVariable,
    printsTypeof,
} from "@/scripts/goal-checker-functions.mjs";

const goals = [
    {
        name: "Definir una variable",
        description:
            "Observa el siguiente ejemplo con atención y luego presiona en el icono de 'play' para ejecutar el código.",
        completed: false,
        successMessage:
            "El operador typeof devuelve el tipo de dato de una variable.",
        test: () => consoleIs("nombre es string"),
    },
    {
        name: "Crear un variable de tipo numerico",
        description:
            "Ahora te toca a vos, define una variable 'edad' con el valor 25 (sin comillas) y muestra su tipo en la consola.",
        completed: false,
        successMessage: "Genial! Ahora sabemos que es de tipo number.",
        test: () => {
            const expectedVariable = {
                type: "let",
                name: "edad",
                value: 25,
            };
            return (
                definesVariable(expectedVariable) &&
                printsTypeof(expectedVariable)
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
        name: "Prueba otra vez, con un número decimal",
        description: `Crea otra variable 'altura' con el valor 1.75 (sin comillas) y muestra su tipo en la consola.`,
        completed: false,
        successMessage:
            "¡Muy bien! Hemos aprendido como mostrar el tipo de dato de una variable.",
        test: () => {
            const expectedVariable = {
                type: "let",
                name: "altura",
                value: 1.75,
            };
            return (
                definesVariable(expectedVariable) &&
                printsTypeof(expectedVariable)
            );
        },
    },
];

export default goals;