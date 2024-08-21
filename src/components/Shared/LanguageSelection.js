import React, { useEffect, useState } from 'react'
import { ENGLISH, LANGUAGE_LIST, VIETNAMESE } from '../../i18n/LanguageList'
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

const LanguageSelection = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("")

    useEffect(() => {
        setLanguage(i18n.language)
    }, [i18n])

    return (
        <Form.Select
            className="m-2"
            size="sm"
            value={language}
            onChange={e => {
                setLanguage(e.target.value)
                i18n.changeLanguage(e.target.value)
            }}
        >
            <option value="vi">{LANGUAGE_LIST[VIETNAMESE]}</option>
            <option value="en">{LANGUAGE_LIST[ENGLISH]}</option>
        </Form.Select>
    )
}

export default LanguageSelection