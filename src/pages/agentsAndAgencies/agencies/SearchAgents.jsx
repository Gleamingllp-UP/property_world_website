import React from 'react'

const SearchAgents = () => {
  return (
    <>
      <div className="container">
        <div className="buyer_d">
          <div className="search_my_agent">
            <h1>Find your agent to <span>find a home</span></h1>
            <div className="row">
              <div className="col-lg-4">
                <div className="big_search_bb2">
                  <input type="text" name="Search" placeholder="Enter location or agent name" className="search_bxi" />
                  <i className="ri-search-line map_iic" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sk_box">
                      <select>
                        <option>Service needed</option>
                        <option>Residential For Sale</option>
                        <option>Residential For Rent</option>
                        <option>Commercial For Sale</option>
                        <option>Commercial For Rent</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sk_box">
                      <select>
                        <option> Language</option>
                        <option> Afrikaans</option>
                        <option> Albanian</option>
                        <option> Amharic</option>
                        <option> Arabic</option>
                        <option> Azerbaijani</option>
                        <option> Bahasa Melayu</option>
                        <option> Baluchi</option>
                        <option> Belarusian</option>
                        <option> Bengali</option>
                        <option> Berber</option>
                        <option> Bulgarian</option>
                        <option> Cantonese</option>
                        <option> Catalan</option>
                        <option> Croatian</option>
                        <option> Czech</option>
                        <option> Danish</option>
                        <option> Dutch</option>
                        <option> English</option>
                        <option> Finnish</option>
                        <option> French</option>
                        <option> German</option>
                        <option> Greek</option>
                        <option> Gujarati</option>
                        <option> Hindi</option>
                        <option> Hungarian</option>
                        <option> Italian</option>
                        <option> Japanese</option>
                        <option> Javanese</option>
                        <option> Kannada</option>
                        <option> Kazakh</option>
                        <option> Korean</option>
                        <option> Kurdi</option>
                        <option> Kyrgyz</option>
                        <option> Latvian</option>
                        <option> Malay</option>
                        <option> Malayalam</option>
                        <option> Mandarin</option>
                        <option> Memon</option>
                        <option> Norwegian</option>
                        <option> Pashto</option>
                        <option> Persian/Farsi</option>
                        <option> Polish</option>
                        <option> Portuguese</option>
                        <option> Punjabi</option>
                        <option> Romanian</option>
                        <option> Russian</option>
                        <option> Serbian</option>
                        <option> Shona</option>
                        <option> Sinhalese</option>
                        <option> Slovak</option>
                        <option> Slovene</option>
                        <option> Somali</option>
                        <option> Spanish</option>
                        <option> Sudanese</option>
                        <option> Swahili</option>
                        <option> Swedish</option>
                        <option> Tagalog</option>
                        <option> Tamil</option>
                        <option> Telugu</option>
                        <option> Thai</option>
                        <option> Turkish</option>
                        <option> Ukranian</option>
                        <option> Urdu</option>
                        <option> Uzbek</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="sk_box">
                      <select id="nationality" name="nationality">
                        <option value>Nationality</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="C么te d'Ivoire">C么te d'Ivoire</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Hong Kong Special Administrative Region of China">Hong Kong Special Administrative Region of China</option>
                        <option value="Hungary">Hungary</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Macedonia Republic of">Macedonia Republic of</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malta">Malta</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">Russian Federation</option>
                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="UAE">UAE</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1">
                <div className="search_btn">
                  <button>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchAgents