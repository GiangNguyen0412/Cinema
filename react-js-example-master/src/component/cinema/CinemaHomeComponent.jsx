import React, { Component } from 'react'

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
                <h2 className="text-center">Chọn Phim</h2>
                <form>
                    <div>
                        <div>
                            <input placeholder="Nhập tên phim cần tìm" name="searchValue" className="form-control" value={this.state.searchValue} onChange={this.onChange}/>
                        </div>                    
                        <div class="dropdown ">
                            <button class="dropbtn">Dropdown</button>
                            <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

export default CinemaHomeComponent;