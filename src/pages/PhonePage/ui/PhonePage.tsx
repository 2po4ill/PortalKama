import { FC, useEffect, useState } from "react";
import cls from "./PhonePage.module.scss";
import { IDictionaryItem } from "entities/Reservation/model/types/reservation";
import { Text } from "shared/ui/Text/Text";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { reservationSelectors } from "entities/Reservation/model/selectors/reservationSelectors";
import { reservationActions } from "entities/Reservation/model/slice/reservationSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import FavouriteFilled from 'shared/assets/icons/Favourite filled.png';
import FavouriteUnfilled from 'shared/assets/icons/Favourite unfilled.png';
import FindIcon from 'shared/assets/icons/Find.png';

export const PhonePage: FC = () => {
    const dispatch = useAppDispatch();
    const dictionary = useSelector(reservationSelectors.getPhoneBook) as IDictionaryItem[];
    const [predicament, setPredicament] = useState("");
    const [filteredList, setFilteredList] = useState<IDictionaryItem[]>(dictionary);
    const today = new Date();
    const [showOnlyOccupied, setShowOnlyOccupied] = useState(false);
    const [favourites, setFavourites] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('phone_favourites') || '[]');
        } catch {
            return [];
        }
    });
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Define allowed columns for sorting
    const columnMap: Record<string, keyof IDictionaryItem> = {
        full_name: 'full_name',
        position: 'position',
        department: 'department',
        mail: 'mail',
        mobile: 'mobile',
        place: 'place',
        place_number: 'place_number',
    };

    // Fetch phone book data if not loaded
    useEffect(() => {
        if (!dictionary || dictionary.length === 0) {
            dispatch(reservationActions.getPhoneBook());
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('phone_favourites', JSON.stringify(favourites));
    }, [favourites]);

    // Filter list whenever dictionary or search changes
    useEffect(() => {
        let baseList = dictionary;
        if (showOnlyOccupied) {
            baseList = baseList.filter(person => person.place && person.place.trim() !== "");
        }
        if (!predicament) {
            setFilteredList(baseList);
        } else {
            const filtered = baseList.filter(person =>
                String(person.full_name).includes(predicament) ||
                String(person.department).includes(predicament) ||
                String(person.position).includes(predicament) ||
                String(person.mail).includes(predicament) ||
                String(person.mobile).includes(predicament) ||
                String(person.place).includes(predicament) ||
                String(person.place_number).includes(predicament)
            );
            setFilteredList(filtered);
        }
    }, [dictionary, predicament, showOnlyOccupied]);

    // Helper to get unique key for an employee
    const getEmployeeKey = (person: IDictionaryItem) => person.mail || person.full_name;

    // Split employees into favourites and others
    const favouriteEmployees = dictionary.filter(person => favourites.includes(getEmployeeKey(person)));
    const nonFavouriteEmployees = filteredList.filter(person => !favourites.includes(getEmployeeKey(person)));

    const toggleFavourite = (person: IDictionaryItem) => {
        const key = getEmployeeKey(person);
        setFavourites(favs => favs.includes(key) ? favs.filter(f => f !== key) : [...favs, key]);
    };

    function renderPhone(person: IDictionaryItem) {
        const isFavourite = favourites.includes(getEmployeeKey(person));
        return (
            <tbody className={cls.column} key={person.full_name + person.mail + person.place}>
                <tr>
                    <td><Text text={person.full_name !== "" ? person.full_name : "-"} onClick={() => setPredicament(person.full_name)} className={cls.exampleLink} /></td>
                    <td><Text text={person.position !== "" ? person.position : "-"} onClick={() => setPredicament(person.position)} className={cls.exampleLink} /></td>
                    <td><Text text={person.department !== "" ? person.department : "-"} onClick={() => setPredicament(person.department)} className={cls.exampleLink} /></td>
                    <td><Text text={person.department !== "" ? person.department : "-"} onClick={() => setPredicament(person.department)} className={cls.exampleLink} /></td>
                    <td><Text text={person.place ? person.place : "-"} onClick={() => setPredicament(person.place)} className={cls.exampleLink} /></td>
                    <td><Text text={person.place_number ? person.place_number : "-"} onClick={() => setPredicament(person.place_number)} className={cls.exampleLink} /></td>
                    <td><Text text={person.mobile !== "" ? person.mobile : "-"} onClick={() => setPredicament(person.mobile)} className={cls.exampleLink} /></td>
                    <td><Text text={person.mail !== "" ? person.mail : "-"} onClick={() => setPredicament(person.mail)} className={cls.exampleLink} /></td>
                    <td style={{textAlign: 'center'}}>
                        <img
                            src={isFavourite ? FavouriteFilled : FavouriteUnfilled}
                            alt={isFavourite ? 'Favourite' : 'Not favourite'}
                            style={{cursor: 'pointer', width: 24, height: 24}}
                            onClick={() => toggleFavourite(person)}
                        />
                    </td>
                </tr>
            </tbody>
        );
    }

    function filterListByColumn(target: string) {
        if (!(target in columnMap)) return;
        let direction = sortDirection;
        if (sortColumn === target) {
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
            setSortDirection(direction);
        } else {
            setSortColumn(target);
            setSortDirection('asc');
            direction = 'asc';
        }
        setSortColumn(target);
        const key = columnMap[target];
        const sorted = [...filteredList].sort((a, b) => {
            const aVal = (a[key] || '').toString();
            const bVal = (b[key] || '').toString();
            if (direction === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
        setFilteredList(sorted);
    }

    return (
        <div className={cls.PhonePage}>
            <div className={cls.ContentWrapper}>
                <div className={cls.header}>
                    <div className={cls.title}>Телефонный справочник</div>
                    <div className={cls.date}>на {today.toLocaleDateString('ru-RU')}</div>
                </div>
                <div className={cls.searchRow} style={{flexDirection: 'column', alignItems: 'flex-start', gap: 0, marginBottom: 0}}>
                    <Input
                        className={cls.searchInput}
                        adornment={
                            <img
                                src={FindIcon}
                                alt="Find"
                                style={{width: 22, height: 22, cursor: 'pointer'}}
                                onClick={() => setPredicament(predicament)}
                            />
                        }
                        value={predicament}
                        onChange={setPredicament}
                        placeholder={"Поиск ..."}
                        onKeyDown={(e) => { if (e.key === 'Enter') setPredicament(predicament); }}
                    />
                    <div style={{marginTop: 8, marginLeft: 2, display: 'flex', alignItems: 'center'}}>
                        <input
                            type="checkbox"
                            checked={showOnlyOccupied}
                            onChange={e => setShowOnlyOccupied(e.target.checked)}
                            style={{marginRight: 6, width: 16, height: 16}}
                        />
                        <span style={{fontSize: '1rem', color: '#15395b'}}>только занятые места</span>
                    </div>
                </div>
                <div className={cls.placeList}>
                    <table className={cls.table}>
                        <thead className={cls.columnHeader}>
                            <tr>
                                <td onClick={() => filterListByColumn("full_name")} className={cls.columnHead}>
                                    <span>ФИО</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'full_name' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("position")} className={cls.columnHead}>
                                    <span>Должность</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'position' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("department")} className={cls.columnHead}>
                                    <span>Отдел</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'department' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("department")} className={cls.columnHead}>
                                    <span>Служба</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'department' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("place")} className={cls.columnHead}>
                                    <span>Рабочее место</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'place' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("place_number")} className={cls.columnHead}>
                                    <span>Стационарный телефон</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'place_number' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("mobile")} className={cls.columnHead}>
                                    <span>Корпоративный сотовый телефон</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'mobile' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td onClick={() => filterListByColumn("mail")} className={cls.columnHead}>
                                    <span>Корпоративная электронная почта</span>
                                    <svg className={`${cls.sortArrow} ${sortColumn === 'mail' ? (sortDirection === 'desc' ? cls.rotated : '') : ''}`} width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/></svg>
                                </td>
                                <td className={cls.columnHead} style={{textAlign: 'center'}}>★</td>
                            </tr>
                        </thead>
                        {/* Favourites always on top, not filtered */}
                        {favouriteEmployees.map(renderPhone)}
                        {/* Non-favourites, filtered/sorted/searched */}
                        {nonFavouriteEmployees.map(renderPhone)}
                    </table>
                </div>
            </div>
        </div>
    );
}; 