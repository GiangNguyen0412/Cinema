import React, { Component } from 'react'
import Select from 'react-select'
import youtubeLogo from '../../images/youtube.png';

class CinemaHomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <h2 className="text-center decorateText">Chọn Phim</h2>
                <br/>
                <form>
                    <div>
                        <div>
                            <input placeholder="Nhập tên phim cần tìm" name="searchValue" className="form-control" value={this.state.searchValue} onChange={this.onChange}/>
                        </div>                    
                        <div class="selectdiv">
                            <label>                                
                                <Select options={options} />
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    

}

const options = [
    { value: 'chocolate', label: <div className="optionTest">'Chocolate'</div> },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export default CinemaHomeComponent;