import React from 'react';

function BookForm( props ){
    return(
        <div>
            {
                <form>
                    <label>
                        BookName
                    </label>
                    <input type="Text" id="inBookName"></input>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            }
        </div>
    );
}

export default BookForm;