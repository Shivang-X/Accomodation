import React from 'react'

export const Loader = () => {
  return (
    <>
        <div class="loadingrapper">
            <span class="circle circle-1"></span>
            <span class="circle circle-2"></span>
            <span class="circle circle-3"></span>
            <span class="circle circle-4"></span>
            <span class="circle circle-5"></span>
            <span class="circle circle-6"></span>
            <span class="circle circle-7"></span>
            <span class="circle circle-8"></span>
        </div>
    </>
  )
}

export const CardLoader = () => {
  return (
    <>
        {/* <div class="loadingrapper">
            <span class="circle circle-1"></span>
            <span class="circle circle-2"></span>
            <span class="circle circle-3"></span>
            <span class="circle circle-4"></span>
            <span class="circle circle-5"></span>
            <span class="circle circle-6"></span>
            <span class="circle circle-7"></span>
            <span class="circle circle-8"></span>
        </div> */}

        <div className="cards">
            <div className="card">
                <div className="top">
                    <img className="image loading" src="" />
                    <div className="data">
                        <div className="head">
                            <div className="head-data">
                                <span className="title loading">a</span>
                                <div class="section">
                                    <span className="city loading">a - </span>
                                    <span className="pincode loading">a | </span>
                                    <span className="createdAt loading">a |</span>
                                    <div>
                                        <input type="checkbox" className="modal-btn loading" id="modal-btn" name="modal-btn"/>
                                        <label for="modal-btn loading"></label> 		                                           
                                    </div>
                                </div>
                            </div>
                            <span className="loading"></span>
                        </div>
                        <div className="room-info">
                            <div className="room-data"><span className="living_room loading">a</span></div>
                            <div className="room-data"><span className="bath_room loading">a</span></div>
                            <div className="room-data"><span className="bed_room loading">a</span></div>
                            <div className="room-data"><span className="kitchens loading">a</span></div>
                        </div>
                        <p className="description loading">a</p>
                    </div>
                </div>
                <div className="bottom loading">
                    <span>
                    a</span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="cards">
            <div className="card">
                <div className="top">
                    <img className="image loading" src="" />
                    <div className="data">
                        <div className="head">
                            <div className="head-data">
                                <span className="title loading">a</span>
                                <div class="section">
                                    <span className="city loading">a - </span>
                                    <span className="pincode loading">a | </span>
                                    <span className="createdAt loading">a |</span>
                                    <div>
                                        <input type="checkbox" className="modal-btn loading" id="modal-btn" name="modal-btn"/>
                                        <label for="modal-btn loading"></label> 		                                           
                                    </div>
                                </div>
                            </div>
                            <span className="loading"></span>
                        </div>
                        <div className="room-info">
                            <div className="room-data"><span className="living_room loading">a</span></div>
                            <div className="room-data"><span className="bath_room loading">a</span></div>
                            <div className="room-data"><span className="bed_room loading">a</span></div>
                            <div className="room-data"><span className="kitchens loading">a</span></div>
                        </div>
                        <p className="description loading">a</p>
                    </div>
                </div>
                <div className="bottom loading">
                    <span>
                    a</span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="cards">
            <div className="card">
                <div className="top">
                    <img className="image loading" src="" />
                    <div className="data">
                        <div className="head">
                            <div className="head-data">
                                <span className="title loading">a</span>
                                <div class="section">
                                    <span className="city loading">a - </span>
                                    <span className="pincode loading">a | </span>
                                    <span className="createdAt loading">a |</span>
                                    <div>
                                        <input type="checkbox" className="modal-btn loading" id="modal-btn" name="modal-btn"/>
                                        <label for="modal-btn loading"></label> 		                                           
                                    </div>
                                </div>
                            </div>
                            <span className="loading"></span>
                        </div>
                        <div className="room-info">
                            <div className="room-data"><span className="living_room loading">a</span></div>
                            <div className="room-data"><span className="bath_room loading">a</span></div>
                            <div className="room-data"><span className="bed_room loading">a</span></div>
                            <div className="room-data"><span className="kitchens loading">a</span></div>
                        </div>
                        <p className="description loading">a</p>
                    </div>
                </div>
                <div className="bottom loading">
                    <span>
                    a</span>
                    <span></span>
                </div>
            </div>
        </div>
    </>
  )
}

