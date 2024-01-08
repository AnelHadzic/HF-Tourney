package com.hfportal.service;

import com.hfportal.api.model.League;
import com.hfportal.api.repository.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeagueService {

    @Autowired
    private LeagueRepository leagueRepository;

    // READ: Get all Leagues
    public List<League> findAllLeagues() {
        return leagueRepository.findAll();
    }

    // CREATE: Add a new League
    public League addLeague(League league) {
        return leagueRepository.save(league);
    }

    // READ: Get a specific League by ID
    public Optional<League> findLeagueById(int id) {
        return leagueRepository.findById(id);
    }

    // UPDATE: Modify an existing League
    public League updateLeague(League league) {
        if (leagueRepository.existsById(league.getId())) {
            return leagueRepository.save(league);
        } else {
            throw new RuntimeException("League not found for ID: " + league.getId());
        }
    }

    // DELETE: Remove a League by ID
    public void deleteLeague(int id) {
        leagueRepository.deleteById(id);
    }
}
