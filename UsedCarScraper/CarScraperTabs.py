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
import re


def main():
    service = Service('./chromedriver.exe')
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome('./chromedriver.exe', options=options)

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
            driver = webdriver.Chrome('./chromedriver.exe', options=options)
            driver.get('https://www.carvana.com/cars')

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
            )

        except NoSuchElementException:
            print("Normal Page Loaded, moving on...")
            break

    search_terms = ['Bluetooth',
                    'Backup Camera',
                    'Infotainment',
                    'Screen',
                    'Navigation',
                    'Hands Free Calling',
                    'Heated Seats',
                    'Power Seat Controls',
                    'Rear Air Vents',
                    'Bed Liner',
                    'Tow Hitch',
                    '4-Cyl',
                    '3-Cyl',
                    'V6',
                    'V8',
                    '6-Cyl',
                    'No Reported Accidents']

    data = {'year_make': [],
            'model': [],
            'mileage': [],
            'details': [],
            'Bluetooth': [],
            'Backup Camera': [],
            'Infotainment': [],
            'Screen': [],
            'Navigation': [],
            'Hands Free Calling': [],
            'Heated Seats': [],
            'Power Seat Controls': [],
            'Rear Air Vents': [],
            'Bed Liner': [],
            'Tow Hitch': [],
            '4-Cyl': [],
            '3-Cyl': [],
            'V6': [],
            'V8': [],
            '6-Cyl': [],
            'city_mpg': [],
            'highway_mpg': [],
            'No Reported Accidents': [],
            'price': [],
            'url': []}

    """
    This will filter by year, from 2009 forward
    """
    driver.find_element(By.XPATH, '/html/body/div[1]/main/header/div[2]/div/button[4]/span').click()
    time.sleep(3)
    year_input = driver.find_element(By.XPATH, '//*[@id="search-header"]/div[2]/div[2]/div[1]/div/div/div[1]/div[1]/div/div[2]/input')
    year_input.click()
    year_input.send_keys("2014")
    time.sleep(2)
    webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()

    num_pages = int(input("Enter the number of pages to scrape: "))
    if num_pages == 0:
        sys.exit(0)

    item_count = 0

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

            highlight_path = '//*[@id="vehicle-details"]/section/div'

            # This escape action is a safeguard to always bypass any modal pop-up windows that might be present
            # One example is a 'reserved' window that prevents scroll action on the page.
            # Rather than check for the modal, always pressing the escape key ensures it will just go away.
            # And selenium doesn't cooperate sometimes so you know what, do it twice for good measure.

            webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()
            webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()


            # Wait until the vehicle-details section is available, which is where all the highlights will be found

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, 'vehicle-details'))
            )

            # TODO TEST DIFFERENCE BETWEEN THESE SCROLL METHODS. THE BELOW PROVES UNRELIABLE
            # METHOD 1

            # vehicle_details = driver.find_element(By.ID, 'vehicle-details')
            # driver.execute_script("arguments[0].scrollIntoView();", vehicle_details)

            # METHOD 2

            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.XPATH, highlight_path))
            )

            data['url'].append(driver.current_url)
            print(data['url'][item_count])
            print(data['year_make'][item_count])
            print('---------------------------------------------')

            '''
            Search the div that contains this information (vehicle-details and children) 
            for mention of the below highlights (bluetooth, heated seats etc.)

            If they are found, append a 1 to the associated list in the dictionary
            Else, selenium will throw an ElementNotFound exception in which case just append a 0 to the list
            '''

            highlights = driver.find_element(By.XPATH, highlight_path)

            # Search the text received for the above declared keys that correspond to the data dictionary keys
            # If found, append a 1 to denote its presence, else 0 to denote its absence



            for term in search_terms:
                if term in highlights.text:
                    data[term].append(1)
                else:
                    data[term].append(0)

            city_highway = re.search(r"\d+ City \/ \d+ Hwy", highlights.text)

            if city_highway is not None:
                split_mpg = city_highway.group().split(' / ')
                data['city_mpg'].append(split_mpg[0])
                data['highway_mpg'].append(split_mpg[1])
            else:
                data['city_mpg'].append(0)
                data['highway_mpg'].append(0)

            time.sleep(1)

            item_count += 1

            driver.back()

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
            )

        file_name = 'CarvanaData200920014.csv'
        df = pd.DataFrame(data)
        df.to_csv(file_name)
        print("Wrote date to CSV using Pandas")

        print(f"Scraped {n + 1} pages..")

        # Click to next page
        driver.find_element(By.XPATH, '//*[@id="pagination"]/li[3]/button[1]').click()

        time.sleep(2)

        # Refresh the page when you land because it changes once for some reason
        # If you don't refresh, you'll have a different list of cars with stats that do not apply to that vehicle
        # Links will be wrong, and 0/1 encoding will be wrong, but it would've been correct for a different
        # list of vehicles

        driver.refresh()

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'result-tile'))
        )

    # After scraping, write the data to a CSV using Pandas





    print("Done")

    driver.quit()


if __name__ == '__main__':
    main()
