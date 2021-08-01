using NUnit.Framework;
using System.IO;
using System;
using UKParliament.CodeTest.Services;
using UKParliament.CodeTest.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace UKParliament.CodeTest.Tests
{
    [TestFixture]
    class ServiceUnitTest
    {
        private IPersonService _personService;
        private List<Person> _people;

        [SetUp]
        public void Setup()
        {
            DbContextOptions<PersonManagerContext> options = new DbContextOptionsBuilder<PersonManagerContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .EnableSensitiveDataLogging()
                .Options;
            _personService = new PersonService(new PersonManagerContext(options));

            _people = new List<Person> { new Person { Id = 1, Name = "Abena Oppong-Asare" } };
        }

        [Test, Order(1)]
        [Category("QuickTests")]
        public void TestAddPerson()
        {
            //Step 1 : Add person to service
            //Step 2 : Check add operation returns success value 1

            var successfulInsert = 1;
            var newPerson = new Person
            {
                Id = 0,
                Name = "Abena Oppong-Asare",
                EmailAddress = "abena.oppongasare.mp@parliament.uk",
                Address = @"House of Commons
                            London
                            SW1A 0AA"
            };
            
            var result = _personService.Add(newPerson);

            Assert.AreEqual(result, successfulInsert);
        }

        [Test, Order(2)]
        public void GetAllTest()
        {
            //Step 1 : Add to service
            //Step 2 : Compare service content to test list

            var newPerson = new Person
            {
                Id = 0,
                Name = "Abena Oppong-Asare",
                EmailAddress = "abena.oppongasare.mp@parliament.uk",
                Address = @"House of Commons
                            London
                            SW1A 0AA"
            };
            _personService.Add(newPerson);

            var people = _personService.GetAll();
            var peopleList =
            people.Select(
                personEntity =>
                new Person { 
                    Id = personEntity.Id, 
                    Name = personEntity.Name
                }).ToList();
            var comparer = new PersonComparer();
            CollectionAssert.AreEqual(
            peopleList.OrderBy(p1 => p1, comparer), _people.OrderBy(p2 => p2, comparer), comparer);
        }

        /// <summary>
        /// Add 1 person to service and compare count to test case list
        /// </summary>
        [Test, Order(3)]
        public void GetAllCountTest()
        {
            var newPerson = new Person
            {
                Id = 0,
                Name = "Abena Oppong-Asare",
                EmailAddress = "abena.oppongasare.mp@parliament.uk",
                Address = @"House of Commons
                            London
                            SW1A 0AA"
            };

             _personService.Add(newPerson);

            int expected = _people.Count;
            var actualPeopleCount = _personService.GetAll().ToList().Count;
            Assert.AreEqual(expected, actualPeopleCount);
        }

        [TearDown]
        public void Setdown()
        {
            _personService = null;
            _people = null;
        }
    }

    public class PersonComparer : IComparer, IComparer<Person>
    {
        public int Compare(object expected, object actual)
        {
            var lhs = expected as Person;
            var rhs = actual as Person;
            if (lhs == null || rhs == null) throw new InvalidOperationException();
            return Compare(lhs, rhs);
        }

        public int Compare(Person expected, Person actual)
        {
            int retVal;
            return (retVal = expected.Id.CompareTo(actual.Id)) != 0 ? retVal : expected.Name.CompareTo(actual.Name);
        }
    }
}
