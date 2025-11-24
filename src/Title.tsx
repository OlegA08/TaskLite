type TitleProp = {
    text1: string;
    text2: string;
};

export function Title(p: TitleProp) {
    console.log(p);
    return (
    <h1>
        Я изучаю (p.text1) + (p.text2)
    </h1>
    );
}