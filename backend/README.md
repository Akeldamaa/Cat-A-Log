# Backend

## Setup
- Ensure you are in the backend directory in your terminal
- Create your virtual environment and activate it
- Install all dependencies using `pip install -r requirements.txt`
- Run all migrations using `python run migrate`
- Create a `.env` in the root of the backend directory and configure it to look like [sample.env](./sample.env)
- Start the python server using `python manage.py runserver`

## Committing new changes
- Before committing any changes, if you installed any dependencies, make sure to update the requirements.txt file using `pip freeze > requirements.txt`