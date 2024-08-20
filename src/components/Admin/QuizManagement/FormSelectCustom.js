import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const FormSelectCustom = ({ title, keyValueList, selected, setSelected }) => {
    return (
        <>
            <Form.Label htmlFor="basic-url">{title}</Form.Label>
            <Form.Select value={selected} onChange={e => setSelected(parseInt(e.target.value, 0))} aria-label="Default select example">
                <option key={uuidv4()} value="0">Select...</option>
                {keyValueList && keyValueList.map(kv =>
                    <option key={uuidv4()} value={kv.value}>{kv.title}</option>
                )}
            </Form.Select>
        </>
    );
}

export default FormSelectCustom;