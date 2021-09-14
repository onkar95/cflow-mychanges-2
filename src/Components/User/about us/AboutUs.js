import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import CallIcon from '@material-ui/icons/Call'
import MailIcon from '@material-ui/icons/Mail'
import RoomIcon from '@material-ui/icons/Room'
import { useStyles } from './AboutUs.mui'
import './AboutUs.css'
import Hero from '../../../Images/AboutUs/aboutus-carousel.png'
import CompanyMissionImg from '../../../Images/AboutUs/aboutus-pic1.png'
import WhyChooseUsImg from '../../../Images/AboutUs/aboutus-pic2.png'
import ContactInfoImg from '../../../Images/AboutUs/aboutus-contact.png'

const AboutUs = ({
  theme,
  setCurrentSectionRequest,
  setCurrentSection,
  currentSection,
  setCurrentSectionProfile,
}) => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [fav, setFav] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className='about-us-wrapper'>
      {/* <div className='hero'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div> */}
      <div className='hero-conatiner'>
        <img src={Hero} alt='about-us-hero' className='hero-img' />
        <div className='hero-text-container'>
          <div className='hero-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </div>
      <div
        className='topcard'
        style={{
          backgroundColor: theme ? '#D8D8D8' : '',
          color: theme ? 'black' : '',
        }}
      >
        <div className='container1'>
          <h3 className="header3">5,234</h3>
          <div
            className='container1-p1'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Loren
          </div>
          <div
            className='container1-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Lorem ipsum dolor sit amet,
          </div>
          <div
            className='container1-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            consectetur adipiscing elit. Vitae.
          </div>
        </div>

        <div className='container2'>
          <h3 className="header3">3,400+</h3>
          <div
            className='container2-p1'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Loren
          </div>
          <div
            className='container2-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Lorem ipsum dolor sit amet,
          </div>
          <div
            className='container2-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            consectetur adipiscing elit. Vitae.
          </div>
        </div>

        <div className='container3'>
          <h3 className="header3">24/7</h3>
          <div
            className='container3-p1'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Loren
          </div>
          <div
            className='container3-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            Lorem ipsum dolor sit amet,
          </div>
          <div
            className='container3-p2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            consectetur adipiscing elit. Vitae.
          </div>
        </div>
      </div>

      <div className='company-mission-conatiner'>
        <div
          className='company-mission-img-back'
          style={{
            backgroundColor: theme ? '#D8D8D8' : '',
          }}
        >
          <img
            src={CompanyMissionImg}
            alt='company-mission'
            className='company-mission-img'
          />
        </div>

        <div className='company-mission'>
          <h4 className="header4">Company Mission</h4>
          <div className='company-mission-paragraph1'>
            <div
              className='company-mission-p1'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              “Lorem ipsum dolor sit amet, consectetur
            </div>
            <div
              className='company-mission-p1'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              adipiscing elit. Mus ullamcorper in risus nunc,
            </div>
            <div
              className='company-mission-p1'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              facilisi massa sed. Felis et vel consectetur
            </div>
            <div
              className='company-mission-p1'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              urna, aliquam integer...”
            </div>
          </div>
          <div
            className='company-mission-paragraph2'
            style={{
              color: theme ? 'black' : '',
            }}
          >
            <div
              className='company-mission-p2'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu,
            </div>
            <div
              className='company-mission-p2'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              phasellus dictum amet, ac enim at facilisis nam vel. Ultrices
              consequat
            </div>
            <div
              className='company-mission-p2'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              velit lectus curabitur. Tellus commodo donec sit augue eget
              iaculis
            </div>
            <div
              className='company-mission-p2'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              vestibulum, mus purus. Volutpat at sollicitudin elementum
              ultricies
            </div>
            <div
              className='company-mission-p2'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              lacus, nisl netus. Amet interdum nascetur ornare consectetur
              nulla.
            </div>
          </div>
        </div>
      </div>

      <div className='why-choose-us-container'>
        <div className='why-choose-us'>
          <h4 className="header4">Why choose us ?</h4>
          <ul className="list1">
            <li
              className='why-choose-us-typography'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </li>
            <li
              className='why-choose-us-typography'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li
              className='why-choose-us-typography'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue
              convallis sed vel molestie.
            </li>
            <li
              className='why-choose-us-typography'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Accumsan sed convallis viverra feugiat convallis.
            </li>
            <li
              className='why-choose-us-typography'
              style={{
                color: theme ? 'black' : '',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus
              eros risus sapien lorem.
            </li>
          </ul>
        </div>
        <img
          src={WhyChooseUsImg}
          alt='why-choose-us'
          className='why-choose-us-img'
        />
      </div>

      <div className='contact-info-wrapper'>
        <div
          className='contact-info'
          style={{
            backgroundColor: theme ? '#D8D8D8' : '',
          }}
        >
          <Grid container>
            <Grid item md={6} sm={12}>
              <Grid container className='form-container'>
                <Grid item xs={12}>
                  <div
                    className='say-hi'
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  >
                    Say Hi!
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    className='talk'
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  >
                    We’d like to talk with you.
                  </div>
                </Grid>
                <Grid item xs={12} className='form'>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='full-name'
                    type='text'
                    placeholder='Full Name'
                    name='full-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.textfield}
                    style={{
                      backgroundColor: theme ? '#D8D8D8' : '',
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                        input: classes.input,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} className='form'>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='fav'
                    type='text'
                    placeholder='What you love'
                    name='fav'
                    value={fav}
                    onChange={(e) => setFav(e.target.value)}
                    className={classes.textfield}
                    style={{
                      backgroundColor: theme ? '#D8D8D8' : '',
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} className='form'>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    multiline
                    required
                    fullWidth
                    id='description'
                    type='description'
                    placeholder='I want to say that...'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={classes.textfield}
                    style={{
                      backgroundColor: theme ? '#D8D8D8' : '',
                    }}
                    InputLabelProps={{
                      classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                      },
                    }}
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              sm={12}
              style={{
                padding: '3rem',
                marginTop: '8rem',
                backgroundImage:
                  'url(../../../Images/AboutUs/aboutus-contact.png)',
              }}
            >
              <div className='contact-info-details'>
                <div
                  className='contact-info-header'
                  style={{
                    color: theme ? 'black' : '',
                  }}
                >
                  Contact Information
                </div>
                <div
                  className='contact-info-instructions'
                  style={{
                    color: theme ? 'black' : '',
                  }}
                >
                  Fill up the form and our Team will get back to you within 24
                  hours.
                </div>
                <div className='contact-info-helpline-container'>
                  <CallIcon
                    className={classes.icon}
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  />
                  <div
                    className='contact-info-helpline'
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  >
                    (+40) 772 100 200
                  </div>
                </div>
                <div className='contact-info-helpline-container'>
                  <MailIcon
                    className={classes.icon}
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  />
                  <div
                    className='contact-info-helpline'
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  >
                    hello@creative-tim.com
                  </div>
                </div>
                <div className='contact-info-helpline-container'>
                  <RoomIcon
                    className={classes.icon}
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  />
                  <div
                    className='contact-info-helpline'
                    style={{
                      color: theme ? 'black' : '',
                    }}
                  >
                    Dyonisie Wolf Bucharest, RO 010458
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className='btn'>
            <Button variant='contained' className={classes.button}>
              SEND MESSAGE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
