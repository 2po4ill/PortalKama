import {FC, memo} from "react";
import {classNames} from "shared/lib/classNames";
import cls from "./PostsList.module.scss";
import {PostListItem} from "features/post/PostListItem";
import {Post} from "entities/Post";

interface IPostsListProps {
    className?: string;
}

const PostsList: FC<IPostsListProps> = memo((props) => {
    const { className } = props;

    const posts = [{
            id: "1",
            title: `День КАМАЗостроения!`,
            text: "На АО Кама Дизель опять праздник, план перевыполнен в 10 раз!",
            img: ["https://ic.pics.livejournal.com/postmodernism/12007536/4966878/4966878_original.jpg"]} as Post,
        {
            id: "2",
            title: `Поздравляем!`,
            text: "День рождения у каждого сотрудника! Всех с праздником!",
            img: ["https://mirinteresen.net/uploads/posts/2018-05/1526196412_1-3.jpg"]} as Post,
        {
            id: "3",
            title: `Инновация в сфере двигателей началась с Набережных Челнов`,
            text: "На АО Кама Дизель изобрели вечный двигатель. Как сказал один из конструкторов: 'Для его создания требуется простая советская вещь, которая есть у каждого дома, а именно...'",
            img: ["https://milnews.ru/nwsimg/aHR0cHM6Ly9tb3Rvci5ydS9pbWdzLzIwMjMvMDIvMTQvMTQvNTc5NTM4Ni80OTdkNjUwMmIyZGIwNDYwMzZjOWM3NTA4M2RkMDdlOTI2N2M4NjM3LmpwZw=="]} as Post,
        {
            id: "4",
            title: `Новая расцветка двигателей`,
            text: "'Да мы хотели черный сделать, немного красной краски пролили, решили полностью покрасить' - Главный дизайнер АО Кама Дизель",
            img: ["https://img-reis.zr.ru/storage/2019/03/zao_kamminz_kama_vypuskaet_novye_modifikacii_dvigatelej_cummins_i_vvodit_sistemu_proverki_podlinnosti_zapchastej_id1.jpg"]} as Post,
        {
            id: "5",
            title: `Пандемия - отмена`,
            text: "'Нет никакого вируса, я его не вижу же, а вы что-ли видите?' - Президент Беларусии",
            img: ["https://narod-dok.ru/wp-content/uploads/2023/12/sa2-7.jpg"]} as Post,
        {
            id: "6",
            title: "'Лучшие? Ну Кама Дизель наверное, они прямо гордость страны'",
            text: "Президент лично похвалил компанию за успехи производства! Всем отпуск!",
            img: ["https://rossaprimavera.ru/static/files/720ad9561561.jpg"]} as Post,
        {
            id: "7",
            title: `Курсы на оператора станка ЧПУ`,
            text: "А ты уже попробовал себя? Записывайся на курс и стань самым успешным в деле." +
                "\n АО \"Кама Дизель\" осуществляет деятельность по разработке двигателей «Кама Дизель» и использует их в процессе оказания услуг. Внесена в Реестр программ для ЭВМ, регистрационный № 2 023 684 206 от 14.11.2023",
            img: ["https://english-abc.ru/storage/Visual_Dictionary/%25D0%25A7%25D0%25B0%25D1%2581%25D1%2582%25D0%25B8%2520%25D1%2580%25D0%25B5%25D1%2587%25D0%25B8/%25D0%2593%25D0%25BB%25D0%25B0%25D0%25B3%25D0%25BE%25D0%25BB%25D1%258B/%25D0%2593%25D0%25BB%25D0%25B0%25D0%25B3%25D0%25BE%25D0%25BB%25D1%258B/%25D0%2593%25D0%25BB%25D0%25B0%25D0%25B3%25D0%25BE%25D0%25BB%25D1%258B%2520%288%29/indicate_%25D1%2583%25D0%25BA%25D0%25B0%25D0%25B7%25D1%258B%25D0%25B2%25D0%25B0%25D1%2582%25D1%258C.jpg"]} as Post,
        {
            id: "8",
            title: `1 апреля`,
            text: "В рамках дня смеха в одном из кулеров сильно посолили воду, будьте бдительны",
            img: ["https://proprikol.ru/wp-content/uploads/2023/02/gifki-animacziya-s-1-aprelya-16.gif"]} as Post,
        {
            id: "9",
            title: `Разработка встала не по карману`,
            text: "Илон Маск, увидев сайт АО Кама Дизель, захотел такой же, однако узнав стоимость, решительно отказался. 'Это то к чему должны стремиться все. Однако такие вещи должны быть более доступны. Уважение разработчикам' - прокоментировал миллиардер",
            img: ["https://avatars.dzeninfra.ru/get-ynews/271828/8c874bb97459f739244faa804281ae1b/800x400"]} as Post,
        {
            id: "10",
            title: `Актер утвержден`,
            text: "В сериале про успех Камы Дизель роль Генерального Директора сыграет Киллиан Мёрфи. 'Это будет моя самая значимая роль. Томас Шелби был лишь подготовкой для этого сериала. Надеюсь не разочарую сотрудников компании' - сказал обладатель премии 'Оскар'",
            img: ["https://whiskeyraiders.com/wp-content/uploads/2023/11/cillian-murphy-scaled.jpg"]} as Post,
    ]

    return (
        <div className={classNames(cls.PostsList, {}, [className])}>
            <div className={cls.listContainer}>
                {
                    posts.map(e => (
                        <PostListItem post={e} key={e.id} />
                    ))
                }
            </div>
        </div>
    );
})
PostsList.displayName = "PostsList";

export { PostsList }