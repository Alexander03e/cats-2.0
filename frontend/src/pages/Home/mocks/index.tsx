import { ICatCardProps } from '@/Components/CatCard';
import { IMediaCardProps } from '@/Components/MediaCard';
import { ISlide } from '@/Pages/Home/components/Slider';

export const mockCatCards = [
    {
        title: 'Кот 1',
        description: 'test test test',
    },
    {
        title: 'Кот 2',
        description: 'test test test',
    },
    {
        title: 'Кот 3',
        description: 'test test test',
    },
    {
        title: 'Кот 4',
        description: 'test test test',
    },
    {
        title: 'Кот 5',
        description: 'test test test',
    },
    {
        title: 'Кот 6',
        description: 'test test test',
    },
] as ICatCardProps[];

export const mockNews = [
    {
        title: 'тейси уехала домой',
        description:
            'Семилетнюю Трейси нашли в переноске у магазина, вот так решили избавиться от чудесной кошечки. В приюте сразу разглядели в Трейси её деликатность и чуткость, бережно заботились и делали всё, чтобы малышка воспряла духом. Трейси отвечала на окружающую её любовь и стала поглядывать на гостей приюта.',
    },
    {
        title: 'тейси уехала домой',
        description:
            'Семилетнюю Трейси нашли в переноске у магазина, вот так решили избавиться от чудесной кошечки. В приюте сразу разглядели в Трейси её деликатность и чуткость, бережно заботились и делали всё, чтобы малышка воспряла духом. Трейси отвечала на окружающую её любовь и стала поглядывать на гостей приюта.',
    },
    {
        title: 'тейси уехала домой',
        description:
            'Семилетнюю Трейси нашли в переноске у магазина, вот так решили избавиться от чудесной кошечки. В приюте сразу разглядели в Трейси её деликатность и чуткость, бережно заботились и делали всё, чтобы малышка воспряла духом. Трейси отвечала на окружающую её любовь и стала поглядывать на гостей приюта.',
    },
] as IMediaCardProps[];

export const mockSlides = [
    {
        title: 'подарите дом котику',
        description: 'Спасая одну жизнь, \n' + 'вы спасаете целый мир!',
        bgImage: '/images/mock-cat.png',
    },
    {
        title: 'подарите дом котику',
        description: 'Спасая одну жизнь, \n' + 'вы спасаете целый мир!',
        bgImage: '/images/mock-cat.png',
    },
    {
        title: 'подарите дом котику',
        description: 'Спасая одну жизнь, \n' + 'вы спасаете целый мир!',
        bgImage: '/images/mock-cat.png',
    },
] as ISlide[];
