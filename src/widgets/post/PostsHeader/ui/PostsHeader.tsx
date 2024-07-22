import {FC, memo, useEffect, useRef, useState} from "react";
import cls from "./PostsHeader.module.scss";
import {classNames} from "shared/lib/classNames";
import {Text} from "shared/ui/Text/Text";

interface IPostsHeaderProps {
    className?: string;
}

const PostsHeader: FC<IPostsHeaderProps> = memo(props => {
    const { className } = props;
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        timerRef.current = setTimeout(function tick(){
            setCurrentDate(new Date());
            timerRef.current = setTimeout(tick, 1000)
        }, 1000);

        return () => {
            clearTimeout(timerRef.current);
        }
    }, [setCurrentDate]);

    const currentDayOfTheWeek = (date: Date) => {
        switch (date.getDay()){
            case 0:
                return "Воскресение"
            case 1:
                return "Понедельник"
            case 2:
                return "Вторник"
            case 3:
                return "Среда"
            case 4:
                return "Четверг"
            case 5:
                return "Пятница"
            case 6:
                return "Суббота"
        }
    }

    const currentCalendarDate = (date: Date) => {
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    }

    return (
        <div className={classNames(cls.PostsHeader, {}, [className])}>
            <div className={cls.content}>
                <div className='text'>
                    <div>
                        <label> НОВОСТИ </label>
                    </div>
                    <div>
                        <a> {currentDayOfTheWeek(currentDate)} </a>
                    </div>
                    <a> {currentCalendarDate(currentDate)} </a>
                    <a> {currentDate.getHours() + ':' + currentDate.getMinutes()} </a>
                </div>
                <div>
                    <img
                        src={'https://dzen.ru/lz5XeGt8f/2Rmz50880/e0cc3ayDlTUT/jDMAzhmdNqedOY7dH_0ToKYuU3XrEW-Wd6IddlPFy-CXf9tb2ZiSEkC_0dacEjOL17Ils52LJ4CsMnnJJ-FUR8yykVsdqELkeX3fPTsdJkBTm2IwmuU797eSKXeXBbtjc84bXzx9tPLQv1AkbrACbJEl1vRPnLUgqBdJeOP1J-FNlycfq7xXFX1ZmvwMLeIRFg7DFX_SzCJEgJ8SUAQZ0nYduvwsf5f2ZJp2Bq2hYjxQJUU1_123UhvWaA0wBEZD-xeFDnqOFTffiah9ns4gUqfPsmWPgU7TlfNug9K3q5HH7apf_y-mJPb7dVctUFCckcV19q0NR6KZBnt8weSmg4klxvwaDWUG3Vv6b56fsWE370LG_xMeICThz5GRNqkjxa34PK091ITnGzeWDzLA_NBVt3WvPHWh6RVJTaOGZ7L6pmZ8GG3kt9yrK0-8f-ETJ4-g1x2APLGV8z9y4PWoMhaveBwPHEQGlWgGtR4SwFwAd0cEvdzGYag0Wj1AhyRyi8fWvOhOB8SvS-l9PCzDYsevMJVvse7S14AsYwM1KJMUTqpt_D_GN7TIp-euYyNd8ed21Cyet3Folej_EXZFASoGlN0LrYU1PCqYrT0NYlGmbNLVbYHuclaAnlJAN3kiB49J_G5dJ5Xm2sQHrNNAXYKXhFQfjtVQuYcI3oIVdUHbVmRMmX3X1B9rKkzev7FjBJ1Sh82TDiBFQB8Q0Of6gMcNq61-HXU3NQlX5A_gA14xRxRFnqw3Q-oWSpxyVRRiiaVkHVpeFrWviaqc_c1xsFS_swV_YMxh1bCPsSD3-hOkHLp9Pu8VdScYZTVd4JDsoJektjyOh5PIxXje4GcUIGnHB5wr7wf1T0u4Di1OEuAUD2IHXmPcs7cSf0OQpWnD9r-pTdzfRAfVOEWW3jKQTsGkF0Z-30WR2oZZPaOG9uAJFsSuyf4F1o2aW0xc_HGi5dzAlY-ALgLm4z-wkkYL0bRcWV2ObXcm5_j2F-wTAD6gBhdXjW2k4_v1SM8jlxRDK9eHP5lv9VdcqFqODVxzIwfsU_a_IsyRFaINYvFHCVO17ogvHY515rfotdbvMkCtM_YnJV5OF2N7lnoOYYaVM5rVRU8Y3Yamnjm6D-7f8uNnbNDmj6Nt4_UgfRByx3qBRW84zjyetlRXWzQ1ryLgH_HGhfVe7OUx-iYZLRKExPDo5Jaui-00dfxZ2G4MrhORF96i962AnBPHcA0QEDUaUlWPOk5cHqY11TvFtv5jUB4iJ-aUz_80YigXmcwhptcS6xanTPuPRoTNa9ss3u_zw6WcIGXMYO-y1TD_kBI2GDEmHBsMr-7mZXVpBwQdYpIfwrZFRK7cZuN7VnmMkdU00vs15v8bfRSHbSmKLz8eYjB0vxHEblEeEdVAzzKT5DtgJB6J38_dxRSEOvZmnHOQLoCV5WQ932SBqUWJr2AEB4A7JLcs6E20lUzJ6p7fTDDQBL8j9Q8SDAOWU00j8FUrQmdeav1MrRWnZopHh61QML_AF8c07T5WUJqVOv8SlVWQCDcVrnvdhWVMOYjNn34Awbf-IcbMkOxDx_Ks0cJ36mLFLQoN_y01FKb5doUMcICNInanNK9cx4BLR_qdkESVgHsHdP06DBTmzvp43B594FLE_oD1v7FfQkfCz5GD9DkTJp9Z_-5f10WG6yUV3wOwDnNHt3b_Dubh-KeYzWO1JODqpNSc-nwHZQ4rOn-_3iJBdZ8C1M_BzAJngF8T8CSYQBY_G98-X3YXhKtkFw4yM13y98VWz5-lEin1uX1DxSZASgRWbqjNZkWtCDkOzvzBIBTvchS8kT_C5pD_A4KWG8PmnzssjH_EFpTZNTXv0UIvgZWV582fBrJpV0qvcId084unJT-av9fULQopHa8voTK3XPM3nzJvg4ajLSIxZJpgFnxo_jzexpRW2vfmv4CiXfIVN3YczJaQ-9XYvjG1VvD4pzV9eZ9Gh_6o6b7NzcPgRl9ihP9APhPFM27jAne5ISe8GZ9erWRVZbtXpL5hQO_gRjdVrd2lU8i2uY7RVNYwiOdErErNtOVMOYqeXs3x4SRMIMV-sR-gprDMwtLmO7D0XRoMXfyWp2Wqx-atciP_osYltL6_tSL5VzodU5T0Ucsn5J2YneV0jOu6nt0fUkBV_RE0_nCcE_XynnOjdUsjtB2J_74tJfdHqyYXrcFC7zIlRRW9vEUSKvZbHVBkZZGrVpaPmC211bz6m63ff_PTVjzg13ySH-Jlwj1jIFW5Q9euu4-f_xckZ2qFFO0AsO5jlbfmvk8Wgft2Cq9BleWw-OW0H0q8RxcOaoq-3t8TkRQ8EMW8o0zi9RHsELHHCaMnrRkd_e9WlwWI1gb_oqA9occXxf985fPpVjtfYmbWkJqHFt6oDlSUjDgITNyu4jJ3_yIGj9JskHUC3hLyN9sTRA66Te_vtIVk6nf3bdDiTeJEdffOzQZj2pc7TEJX5sBZ8#DSD'}
                        className='image' alt='plan'/>
                </div>
            </div>
        </div>
    );
});
PostsHeader.displayName = "PostsHeader";

export {PostsHeader}