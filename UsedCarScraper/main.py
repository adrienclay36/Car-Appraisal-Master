from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.service import Service
import pandas as pd
import time
import sys



def main():
    service = Service('./chromedriver.exe')
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)

    driver.get('https://www.carvana.com/cars')

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
    )

    '''
    Page changes on unknown conditions (promotional landing vs. regular landing?)
    
    The below is to account for cases in which those particular class names are present in the HTML
    If the 'experimental' class name is present, the promotional page has loaded and we need to quit and try again
    
    The promotional page usually only comes up once and returns to 'normal' on the next load. 
    '''
    while True:
        try:

            driver.find_element(By.CLASS_NAME, 'year-make-experiment')
            print("Promo Page Loaded, trying again")
            driver.quit()
            driver = webdriver.Chrome(service=service, options=options)
            driver.get('https://www.carvana.com/cars')

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
            )

        except NoSuchElementException:
            print("Normal Page Loaded, moving on...")
            break

    data = {'year_make': [],
            'model': [],
            'mileage': [],
            'details': [],
            'bluetooth': [],
            'backup_camera': [],
            'infotainment': [],
            'screen': [],
            'navigation': [],
            'hands_free': [],
            'heated_seats': [],
            'power_seat_controls': [],
            'rear_air_vents': [],
            'bed_liner': [],
            'tow_hitch': [],
            'engine_4_cyl': [],
            'engine_v6': [],
            'engine_v8': [],
            'engine_6_cyl': [],
            'price': [],
            'url': []}

    """
    This will filter by year, from 2009 forward
    """
    # driver.find_element(By.XPATH, '/html/body/div[1]/main/header/div[2]/div/button[4]/span').click()
    # time.sleep(3)
    # year_input = driver.find_element(By.XPATH, '//*[@id="search-header"]/div[2]/div[2]/div[1]/div/div/div[1]/div[1]/div/div[2]/input')
    # year_input.click()
    # year_input.send_keys("2012")
    # time.sleep(2)
    # webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()


    num_pages = int(input("Enter the number of pages to scrape: "))
    if num_pages == 0:
        sys.exit(0)


    for n in range(num_pages):

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
        )

        results = driver.find_elements(By.CLASS_NAME, 'result-tile')

        for pane in results:

            '''
            This is the 'normal' page class names that you would expect to see if you loaded the page in a regular,
            non-controlled browser with cookies present (?) etc.
            '''

            year_make = pane.find_elements(By.CLASS_NAME, 'year-make')
            for item in year_make:
                data['year_make'].append(item.text)

            models = pane.find_elements(By.CLASS_NAME, 'model')

            for model in models:
                data['model'].append(model.text)

            prices = pane.find_elements(By.CLASS_NAME, 'price ')

            for price in prices:
                data['price'].append(price.text)

            mileages = pane.find_elements(By.CLASS_NAME, 'mileage')

            for mileage in mileages:
                data['mileage'].append(mileage.text)

            vehicle_details = pane.find_elements(By.CLASS_NAME, 'trim')

            for detail in vehicle_details:
                data['details'].append(detail.text)



        for i in range(len(results)):

            results = driver.find_elements(By.CLASS_NAME, 'result-tile')

            time.sleep(2)


            '''
            The email-capture box is not allowing the element to be 'clicked' because it's covering it at the time
            This driver.execute_script will focus the item so that it is in view and can be clicked
            The email-capture doesn't seem to be accessible to actually just 'close' it when it's there, which is
            from the second page forward, so just moving the element out from behind was the best course of action
            
            This box is only present sometimes, but when it is, it WILL prevent click functionality.
            
            That stupid email box cost me like 2 hours in debugging and a lot of heartache :(
            '''
            driver.execute_script("arguments[0].scrollIntoView();", results[i])

            results[i].click()




            # Wait until the 'vehicle-details' section is available, which is where all the highlights will be found

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, 'vehicle-details'))
            )

            data['url'].append(driver.current_url)



            # This scroll down is to the make the necessary items visible on the page to be accessed correctly.
            # It may or may not be ready but is more of a safety measure to ensure that it actually finds that data

            # TODO TEST THIS TO SEE IF THIS WORKS BETTER THAN THE LINE OF CODE COMMENTED OUT RIGHT BELOW IT
            # TODO ALSO CHECK IF THIS SCROLLING BEHAVIOR IS EVEN NECESSARY
            # TODO FIRST METHOD
            # vehicle_details = driver.find_element(By.ID, 'vehicle-details')
            # driver.execute_script("arguments[0].scrollIntoView();", vehicle_details)

            # TODO SECOND METHOD
            # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            '''
            Search the entire page for mention of the below highlights (bluetooth, heated seats etc.)
            
            If they are found, append a 1 to the associated list in the dictionary
            Else, selenium will throw an ElementNotFound exception in which case just append a 0 to the list
            '''

            # TODO THIS ONE IS A POSSIBILITY
            highlight_grid = "//*[@id='vehicle-details']/section/div/div[1][contains(text(), 'Bluetooth')]"

            # TODO THIS ONE WORKS AS FAR AS WE KNOW
            old_string = "//*[contains(text(), 'Bluetooth')]"



            # BEGIN HIGHLIGHTS
            try:
                bluetooth = driver.find_element(By.XPATH, "//div[text()='Bluetooth']")
                data['bluetooth'].append(1)
            except:
                data['bluetooth'].append(0)


            try:
                camera = driver.find_element(By.XPATH, "//div[text()='Backup Camera']")
                print(camera)
                data['backup_camera'].append(1)

            except:
                data['backup_camera'].append(0)

            try:
                infotainment = driver.find_element(By.XPATH, "//*[contains(text(), 'Infotainment')]")
                data['infotainment'].append(1)
            except:
                data['infotainment'].append(0)

            try:
                hands_free = driver.find_element(By.XPATH, "//div[contains(text(), 'Hands Free Calling')]")
                data['hands_free'].append(1)

            except:
                data['hands_free'].append(0)

            try:
                heated_seats = driver.find_element(By.XPATH, "//*[contains(text(), 'Heated Seats')]")
                data['heated_seats'].append(1)
            except:
                data['heated_seats'].append(0)

            try:
                power_seat = driver.find_element(By.XPATH, "//*[contains(text(), 'Power Seat Controls')]")
                data['power_seat_controls'].append(1)
            except:
                data['power_seat_controls'].append(0)


            try:
                rear_air = driver.find_element(By.XPATH, "//*[contains(text(), 'Rear Air Vents')]")
                data['rear_air_vents'].append(1)
            except:
                data['rear_air_vents'].append(0)

            try:
                engine = driver.find_element(By.XPATH, "//*[contains(text(), '4-Cyl')]")
                data['engine_4_cyl'].append(1)
            except:
                data['engine_4_cyl'].append(0)

            try:
                engine_v6 = driver.find_element(By.XPATH, "//*[contains(text(), 'V6')]")
                data['engine_v6'].append(1)
            except:
                data['engine_v6'].append(0)

            try:
                engine_v8 = driver.find_element(By.XPATH, "//*[contains(text(), 'V8')]")
                data['engine_v8'].append(1)
            except:
                data['engine_v8'].append(0)

            try:
                touch_screen = driver.find_element(By.XPATH, "//*[contains(text(), 'Screen')]")
                data['screen'].append(1)
            except:
                data['screen'].append(0)

            try:
                navigation = driver.find_element(By.XPATH, "//*[text()='Navigation']")
                data['navigation'].append(1)
            except:
                data['navigation'].append(0)


            try:
                engine_6_cyl = driver.find_element(By.XPATH, "//*[contains(text(), '6-Cyl')]")
                data['engine_6_cyl'].append(1)
            except:
                data['engine_6_cyl'].append(0)

            try:
                bed_line = driver.find_element(By.XPATH, "//*[contains(text(), 'Bed-Liner')]")
                data['bed_liner'].append(1)
            except:
                data['bed_liner'].append(0)

            try:
                tow_hitch = driver.find_element(By.XPATH, "//*[contains(text(), 'Tow-Hitch Area')]")
                data['tow_hitch'].append(1)
            except:
                data['tow_hitch'].append(0)


            # END HIGHLIGHTS

            time.sleep(1)

            driver.back()

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
            )



        print(f"Scraped {n + 1} pages..")


        # Click to next page
        driver.find_element(By.XPATH, '//*[@id="pagination"]/li[3]/button[1]').click()

        time.sleep(2)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
        )



    # After scraping, write the data to a CSV using Pandas

    try:
        file_name = 'CarvanaData.csv'
        df = pd.DataFrame(data)
        df.to_csv(file_name)
        print("Wrote date to CSV using Pandas")
    except:
       print("Couldn't write to CSV using Pandas.")

    print("Done")

    driver.quit()



if __name__ == '__main__':
    main()
